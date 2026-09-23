extends CanvasLayer
## Web demo only. On phones and tablets: a floating move stick on the left, DASH on the
## bottom right, a pause button top right, and an automatic pause when the phone turns
## portrait. Positions are in the fixed 1280x720 viewport (stretch aspect "keep").

const STICK_HOME := Vector2(165, 572)
const STICK_RADIUS := 84.0
const KNOB_RADIUS := 34.0
const STICK_ZONE_X := 600.0
const STICK_MIN_Y := 200.0
const DASH_POS := Vector2(1150, 588)
const DASH_RADIUS := 54.0
const PAUSE_POS := Vector2(1236, 158)
const PAUSE_RADIUS := 30.0
const DEADZONE := 0.12
const ORIENT_POLL := 0.25

const INK := Color("191c18")
const CREAM := Color("fff8e8")

var _pad: Control
var _stick_id := -1
var _stick_center := STICK_HOME
var _stick_vec := Vector2.ZERO
var _dash_id := -1
var _orient_t := 0.0

func _ready() -> void:
	layer = 90
	process_mode = Node.PROCESS_MODE_ALWAYS
	if not OS.has_feature("web") or not bool(JavaScriptBridge.eval("window.matchMedia('(pointer: coarse)').matches", true)):
		set_process(false)
		set_process_input(false)
		return
	_pad = Control.new()
	_pad.set_anchors_preset(Control.PRESET_FULL_RECT)
	_pad.mouse_filter = Control.MOUSE_FILTER_IGNORE
	_pad.draw.connect(_draw_pad)
	add_child(_pad)

func _process(delta: float) -> void:
	var active := not get_tree().paused
	if _pad.visible != active:
		_pad.visible = active
		if not active:
			_release_all()
	_orient_t -= delta
	if _orient_t <= 0.0:
		_orient_t = ORIENT_POLL
		if active and bool(JavaScriptBridge.eval("window.innerHeight > window.innerWidth", true)):
			_release_all()
			_send_pause()
	if active:
		_pad.queue_redraw()

func _input(event: InputEvent) -> void:
	if not _pad.visible:
		return
	if event is InputEventScreenTouch:
		var p: Vector2 = event.position
		if event.pressed:
			if p.distance_to(PAUSE_POS) <= PAUSE_RADIUS + 18.0:
				_release_all()
				_send_pause()
			elif _dash_id == -1 and p.distance_to(DASH_POS) <= DASH_RADIUS + 26.0:
				_dash_id = event.index
				Input.action_press("dash")
			elif _stick_id == -1 and p.x < STICK_ZONE_X and p.y > STICK_MIN_Y:
				_stick_id = event.index
				_stick_center = Vector2(clampf(p.x, STICK_RADIUS + 8.0, STICK_ZONE_X), clampf(p.y, STICK_MIN_Y, 720.0 - STICK_RADIUS - 8.0))
				_move_stick(p)
		else:
			if event.index == _stick_id:
				_stick_id = -1
				_stick_center = STICK_HOME
				_set_stick(Vector2.ZERO)
			if event.index == _dash_id:
				_dash_id = -1
				Input.action_release("dash")
	elif event is InputEventScreenDrag and event.index == _stick_id:
		_move_stick(event.position)

func _move_stick(p: Vector2) -> void:
	var v := (p - _stick_center) / STICK_RADIUS
	if v.length() > 1.0:
		v = v.normalized()
	_set_stick(v if v.length() >= DEADZONE else Vector2.ZERO)

## Input.get_vector() zeroes anything under the move actions' deadzone and rescales the
## rest, so push the stick past it: any deflection outside our own deadzone moves.
func _set_stick(v: Vector2) -> void:
	_stick_vec = v
	var out := Vector2.ZERO
	if v != Vector2.ZERO:
		var dz := InputMap.action_get_deadzone("move_right")
		var l := (v.length() - DEADZONE) / (1.0 - DEADZONE)
		out = v.normalized() * minf(1.0, dz + 0.02 + l * (1.0 - dz))
	_axis("move_left", "move_right", out.x)
	_axis("move_up", "move_down", out.y)

func _axis(neg: StringName, pos: StringName, value: float) -> void:
	if value < 0.0:
		Input.action_release(pos)
		Input.action_press(neg, -value)
	elif value > 0.0:
		Input.action_release(neg)
		Input.action_press(pos, value)
	else:
		Input.action_release(neg)
		Input.action_release(pos)

func _release_all() -> void:
	_stick_id = -1
	_stick_center = STICK_HOME
	_set_stick(Vector2.ZERO)
	if _dash_id != -1:
		_dash_id = -1
		Input.action_release("dash")

func _send_pause() -> void:
	for pressed in [true, false]:
		var ev := InputEventAction.new()
		ev.action = &"pause"
		ev.pressed = pressed
		Input.parse_input_event(ev)

## Frosted glass: faint white fill over a light tint of ink, thin bright rim, and a
## highlight arc along the top edge. Brightens while held.
func _glass(center: Vector2, radius: float, lit: bool) -> void:
	_pad.draw_circle(center, radius, Color(INK, 0.14))
	_pad.draw_circle(center, radius, Color(CREAM, 0.16 if lit else 0.08))
	_pad.draw_arc(center, radius - 1.0, 0.0, TAU, 56, Color(CREAM, 0.6 if lit else 0.38), 2.0, true)
	_pad.draw_arc(center, radius * 0.8, PI * 1.18, PI * 1.82, 24, Color(CREAM, 0.28 if lit else 0.16), 3.0, true)

func _draw_pad() -> void:
	var font := _pad.get_theme_font("font", "Label")
	var held := _stick_id != -1
	_glass(_stick_center, STICK_RADIUS, held)
	var knob := _stick_center + _stick_vec * STICK_RADIUS
	_pad.draw_circle(knob, KNOB_RADIUS, Color(CREAM, 0.34 if held else 0.2))
	_pad.draw_arc(knob, KNOB_RADIUS - 1.0, 0.0, TAU, 40, Color(CREAM, 0.75 if held else 0.5), 2.0, true)

	var dashing := _dash_id != -1
	_glass(DASH_POS, DASH_RADIUS, dashing)
	_pad.draw_string(font, Vector2(DASH_POS.x - DASH_RADIUS, DASH_POS.y + 8.0), "DASH", HORIZONTAL_ALIGNMENT_CENTER, DASH_RADIUS * 2.0, 22, Color(CREAM, 0.9 if dashing else 0.7))

	_glass(PAUSE_POS, PAUSE_RADIUS, false)
	for dx in [-6.0, 6.0]:
		_pad.draw_rect(Rect2(PAUSE_POS + Vector2(dx - 3.0, -10.0), Vector2(6.0, 20.0)), Color(CREAM, 0.75))
