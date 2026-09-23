#!/usr/bin/env python3
"""Builds the 2D Survival web demo into public/demo/<version>/.

The game repo is only read. Everything is copied into demo/.work (gitignored),
patched there, imported and exported with Godot's no-threads web template.

    python3 demo/build.py [--game ~/brotato-clone] [--godot /path/to/Godot]
"""
from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent
DEMO = SITE / "demo"
WORK = DEMO / ".work"
OVERRIDES = DEMO / "overrides"
OUT_ROOT = SITE / "public" / "demo"
MANIFEST = SITE / "lib" / "demo.ts"

COPY_DIRS = ["autoload", "scenes", "scripts", "data", "assets"]
COPY_FILES = ["project.godot", "icon.svg", "icon.svg.import", "default_bus_layout.tres"]

# Paths (relative to the game root) the 2D Survival run never loads.
SKIP = [
    "scenes/ui/home.gd",
    "scenes/ui/hatchery",
    "assets/arena_ground.png",
    "assets/expedition",
    "assets/arenas/diner.png",
    "assets/arenas/farm.png",
    "assets/arenas/rooftop.png",
    "assets/arenas/station.png",
]


def patch(path: Path, old: str, new: str, count: int = 1) -> None:
    text = path.read_text()
    found = text.count(old)
    if found != count:
        sys.exit(f"patch failed: expected {count} match(es) in {path.relative_to(WORK)}, found {found}:\n{old}")
    path.write_text(text.replace(old, new))


def copy_game(game: Path) -> None:
    if WORK.exists():
        keep = WORK / ".godot"
        for child in WORK.iterdir():
            if child != keep:
                shutil.rmtree(child) if child.is_dir() else child.unlink()
    WORK.mkdir(parents=True, exist_ok=True)

    skip = {(game / s).resolve() for s in SKIP}

    def ignore(dirpath: str, names: list[str]) -> list[str]:
        base = Path(dirpath).resolve()
        out = []
        for n in names:
            p = base / n
            stem = p.with_suffix("") if n.endswith(".import") else p
            if p in skip or stem in skip or n == ".DS_Store":
                out.append(n)
        return out

    for d in COPY_DIRS:
        shutil.copytree(game / d, WORK / d, ignore=ignore)
    for f in COPY_FILES:
        if (game / f).exists():
            shutil.copy2(game / f, WORK / f)
    shutil.copytree(OVERRIDES, WORK, dirs_exist_ok=True)


def apply_patches() -> None:
    proj = WORK / "project.godot"
    patch(proj, 'config/features=PackedStringArray("4.4", "Forward Plus")',
          'config/features=PackedStringArray("4.4", "GL Compatibility")')
    patch(proj, 'renderer/rendering_method="forward_plus"',
          'renderer/rendering_method="gl_compatibility"\nrenderer/rendering_method.mobile="gl_compatibility"')
    patch(proj, "window/size/mode=3", "window/size/mode=0")
    patch(proj, "anti_aliasing/quality/screen_space_aa=1", "anti_aliasing/quality/screen_space_aa=0")
    # The HUD is laid out in fixed 1280x720 coordinates; letterbox instead of growing
    # the viewport when the browser frame isn't 16:9.
    patch(proj, 'window/stretch/aspect="expand"', 'window/stretch/aspect="keep"')
    patch(proj, 'Coop="*res://autoload/coop.gd"\n',
          'Coop="*res://autoload/coop.gd"\nDemoTouch="*res://demo/touch_controls.gd"\n')

    main = WORK / "scenes" / "main.gd"
    patch(main, 'const STARTSCREEN := preload("res://scenes/ui/home.gd")',
          'const STARTSCREEN := preload("res://demo/start_stub.gd")')
    patch(main, 'if RunState.boot_splash_seen or Settings.skip_splash or "--experimental-modes-preview" in OS.get_cmdline_user_args():',
          "if true:")
    patch(main, '''	if preload("res://experimental/survival/setup.gd").return_to_entry:
		preload("res://experimental/survival/setup.gd").return_to_entry=false
		startscreen._experimental_btn.grab_focus.call_deferred()
	elif "--experimental-modes-preview" in OS.get_cmdline_user_args():
		startscreen._open_experimental_modes.call_deferred()
	if not Coop.last_error.is_empty():
		startscreen.hide()
		multiplayer_lobby.open()
		multiplayer_lobby._on_error(Coop.last_error)
		Coop.last_error = ""
''', '''	RunState.character_id = "egg"
	RunState.arena_id = "quarry"
	RunState.daily = false
	RunState.room_clear = false
	_on_play_pressed.call_deferred()
''')

    patch(WORK / "scripts" / "unlock_db.gd",
          'static var all_unlocked: bool = OS.has_environment("EGGCENTRIC_UNLOCK_ALL")',
          "static var all_unlocked: bool = true")

    patch(WORK / "autoload" / "settings.gd",
          'if DisplayServer.get_name() == "headless" or (OS.has_environment("EGGCENTRIC_SHOT")',
          'if OS.has_feature("web") or DisplayServer.get_name() == "headless" or (OS.has_environment("EGGCENTRIC_SHOT")')

    leftovers = subprocess.run(
        ["rg", "-l", "res://experimental|scenes/ui/home.gd|scenes/ui/hatchery", "--glob", "*.gd", "--glob", "*.tscn", "--glob", "*.tres", str(WORK)],
        capture_output=True, text=True,
    ).stdout.strip()
    if leftovers:
        sys.exit(f"demo copy still references excluded 3D/menu code:\n{leftovers}")


def godot(binary: str, *args: str, timeout: int = 1800) -> None:
    cmd = [binary, "--headless", "--path", str(WORK), *args]
    print("+", " ".join(cmd), flush=True)
    res = subprocess.run(cmd, timeout=timeout)
    if res.returncode != 0:
        sys.exit(f"godot exited {res.returncode}")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--game", default=str(Path.home() / "brotato-clone"))
    ap.add_argument("--godot", default="/Applications/Godot.app/Contents/MacOS/Godot")
    args = ap.parse_args()
    game = Path(args.game).expanduser().resolve()

    version = re.search(r'config/version="([^"]+)"', (game / "project.godot").read_text()).group(1)
    out = OUT_ROOT / version

    copy_game(game)
    apply_patches()

    godot(args.godot, "--import")

    if OUT_ROOT.exists():
        shutil.rmtree(OUT_ROOT)
    out.mkdir(parents=True)
    godot(args.godot, "--export-release", "Web", str(out / "index.html"))

    files = {p.name: p.stat().st_size for p in sorted(out.iterdir())}
    too_big = [n for n, s in files.items() if s > 95 * 1024 * 1024]
    if too_big:
        sys.exit(f"files over GitHub's 100 MB limit: {too_big}")
    download = files.get("index.pck", 0) + files.get("index.wasm", 0)

    MANIFEST.write_text(
        "// Generated by demo/build.py. Do not edit.\n"
        f"export const DEMO_VERSION = {json.dumps(version)};\n"
        f'export const DEMO_SRC = "/demo/{version}/index.html";\n'
        f"export const DEMO_DOWNLOAD_MB = {round(download / 1048576)};\n"
    )
    for n, s in files.items():
        print(f"  {n:32s} {s / 1048576:8.1f} MB")
    print(f"built {out.relative_to(SITE)} ({download / 1048576:.0f} MB download)")


if __name__ == "__main__":
    main()
