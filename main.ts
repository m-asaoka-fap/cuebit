input.onButtonPressed(Button.A, function () {
    cuebit.forward_10()
})
cuebit.start()
basic.forever(function () {
    cuebit.setorder(1000)
})
