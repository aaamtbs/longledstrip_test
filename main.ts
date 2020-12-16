function aaam () {
    MicVal = input.soundLevel()
    _aaamT = 4
    if (MicVal > 120) {
        AaamLedState[0] = _aaamT
    }
    strip.clear()
    for (let index1 = 0; index1 <= AaamLedStep - 1; index1++) {
        _b = 45
        if (AaamLedState[index1] > 0) {
            _b = 45
        } else {
            _b = 0
        }
        for (let index2 = (NumOfLEDs/AaamLedStep)*index1; index2 <= (NumOfLEDs/AaamLedStep)*(index1+1); index2++) {
            strip.setPixelColor(index2, neopixel.hsl(AaamLedColor[index1], 100, _b))
            strip.setPixelColor(41 - index2, neopixel.hsl(AaamLedColor[index1], 100, _b))
            strip.setPixelColor(index2 + 42, neopixel.hsl(AaamLedColor[index1], 100, _b))
        }
    }
    for (let index12 = 0; index12 <= AaamLedStep - 1; index12++) {
        if (AaamLedState[index12] > 0) {
            AaamLedState[index12] -= 1;
        }
        if (index12 < AaamLedStep - 1) {
            if (AaamLedState[index12] == 1 && AaamLedState[index12 + 1] == 0) {
                AaamLedState[index12 + 1] = _aaamT
                AaamLedColor[index12 + 1] = Math.random() * 360
            }
        }
    }
    strip.show()
}
// null.showColor(neopixel.colors(NeoPixelColors.Red))
function ALLOn (val: number) {
    strip.clear()
    for (let index22 = 0; index22 <= NumOfLEDs; index22++) {
        strip.showRainbow(1, 360)
    }
    strip.show()
}
// t = current time
// b = start value
// c = change in value
// d = duration
// basic.pause(1)
function breath () {
    if (t % 100 == 0) {
        breathDir *= -1;
    }
    // breathB = easeInOutQuad(t % 100, 45, 10, 100)
    if (breathDir == 1) {
        breathB = easeInOutQuad(t % 100, 0, 100, 100)
    } else {
        serial.writeLine("here")
        breathB = 100 - easeInOutQuad(t % 100, 0, 100, 100)
    }
    // serial.writeLine(breathB.toString())
    // serial.writeLine(breathB.toString() +", " + breathDir.toString())
    strip.clear()
    for (let index = 0; index <= 120; index++) {
        strip.setPixelColor(index, neopixel.hsl(t / 20 % 360, 100, breathB * 0.45 + 5))
        strip.setPixelColor(41 - index, neopixel.hsl(t / 20 % 360, 100, breathB * 0.45 + 5))
        strip.setPixelColor(index + 42, neopixel.hsl(t / 20 % 360, 100, breathB * 0.45 + 5))
    }
    strip.show()
}
input.onButtonPressed(Button.A, function () {
    mode += 0 - 1
    if (mode < 0) {
        mode = 2
    }
    mode = mode % 3
})
// null.showColor(neopixel.colors(NeoPixelColors.Red))
function Equalizer (val: number) {
    MicVal = input.soundLevel()
    anchor = MicVal / 100 * NumOfLEDs
    strip.clear()
    for (let index22 = 0; index22 <= NumOfLEDs; index22++) {
        // strip.setPixelColor(index22, neopixel.hsl(index22 * ColorStep, 100, 50))
        // strip.setPixelColor(index22, neopixel.hsl(index22 * ColorStep, 40, 5))
        if (index22 <= anchor) {
            strip.setPixelColor(index22, neopixel.hsl(index22 * ColorStep, 100, 50))
            strip.setPixelColor(41 - index22, neopixel.hsl(index22 * ColorStep, 100, 50))
            strip.setPixelColor(index22 + 42, neopixel.hsl(index22 * ColorStep, 100, 50))
        } else {
            strip.setPixelColor(index22, neopixel.hsl(index22 * ColorStep, 40, 5))
            strip.setPixelColor(41 - index22, neopixel.hsl(index22 * ColorStep, 40, 5))
            strip.setPixelColor(index22 + 42, neopixel.hsl(index22 * ColorStep, 40, 5))
        }
    }
    strip.show()
    basic.pause(1)
}
// t = current time
// b = start value
// c = change in value
// d = duration
function easeInOutQuad (_t: number, _b: number, _c: number, _d: number) {
    _t /= _d/2;
if (_t < 1) {
        return _c / 2 * _t * _t + _b
    }
    _t += -1
    return (0 - _c) / 2 * (_t * (_t - 2) - 1) + _b
}
input.onButtonPressed(Button.B, function () {
    mode += 1
    mode = mode % 3
})
let breathB = 0
let t = 0
let _aaamT = 0
let MicVal = 0
let ColorStep = 0
let mode = 0
let anchor = 0
let _t = 0
let strip: neopixel.Strip = null
let NumOfLEDs = 0
let breathDir = 0
let AaamLedStep = 0
let AaamLedColor: number[] = []
let AaamLedState: number[] = []
let _b = 0
AaamLedStep = 7
AaamLedState = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
AaamLedColor = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
NumOfLEDs = 21
let TotalNumLeds = 90
anchor = 0
mode = 0
strip = neopixel.create(DigitalPin.P2, TotalNumLeds, NeoPixelMode.RGB)
ColorStep = 360 / NumOfLEDs
breathDir = 1
basic.forever(function () {
    // if (t >= 255) {
    // t = 0
    // }
    if (mode == 0) {
        ALLOn(1)
    }
    if (mode == 1) {
        breath()
    }
    if (mode == 2) {
        aaam()
    }
    t += 1
})
