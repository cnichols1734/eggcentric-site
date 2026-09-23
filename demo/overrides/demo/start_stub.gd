extends Control
## Web demo stand-in for the Hatchery home screen. The demo boots straight into a run, so
## this only carries the signals and members main.gd touches.

signal play_pressed
signal experimental_pressed
signal room_clear_pressed
signal test_pressed
signal multiplayer_pressed

var _multiplayer_btn := Button.new()
var _experimental_btn := Button.new()

func _set_run_mode(_mode: String) -> void:
	pass

func _open_experimental_modes() -> void:
	play_pressed.emit()
