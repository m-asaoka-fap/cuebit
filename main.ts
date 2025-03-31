input.onButtonPressed(Button.A, function () {
    cuebit.back_10()
})
input.onButtonPressed(Button.AB, function () {
    cuebit.brake()
    cuebit.rightRotate_90()
})
input.onButtonPressed(Button.B, function () {
    cuebit.forward_10()
})
cuebit.start()
basic.forever(function () {
    cuebit.setorder(1000)
})
