/**
 * Helper object to provide constant values used in the application.
 */
export const Constants = {
  iracing: {
    flags: {
      // iRacing SessionFlags
      noFlag:            268697600,
      checkeredFlag:     0x00000001,
      whiteFlag:         0x00000002,
      greenFlag:         0x00000004,
      yellowFlag:        0x00000008,
      redFlag:           0x00000010,
      blueFlag:          0x00000020,
      debrisFlag:        0x00000040,
      crossedFlag:       0x00000080,
      yellowWavingFlag:  0x00000100,
      oneLapToGreenFlag: 0x00000200,
      greenHeldFlag:     0x00000400,
      tenToGoFlag:       0x00000800,
      fiveToGoFlag:      0x00001000,
      randomWavingFlag:  0x00002000,
      cautionFlag:       0x00004000,
      cautionWavingFlag: 0x00008000,
      blackFlag:         0x00010000,
      disqualifyFlag:    0x00020000,
      repairFlag:        0x00100000,
      startHiddenFlag:   0x10000000,
      startReadyFlag:    0x20000000,
      startSetFlag:      0x40000000,
      startGoFlag:       0x80000000
    },
    spotterSignal: {
      // iRacing CarLeftRight values
      off:          0,
      clear:        1,
      carLeft:      2,
      carRight:     3,
      carLeftRight: 4,
      twoCarsLeft:  5,
      twoCarsRight: 6
    },
    sessionState: {
      // iRacing SessionState values
      invalid:    0x00000001,
      getInCar:   0x00000002,
      warmUp:     0x00000004,
      paradeLaps: 0x00000008,
      racing:     0x00000010,
      checkered:  0x00000010,
      coolDown:   0x00000010
    },
    trackSurface: {
      // iRacing CarIdxTrackSurface values
      notInWorld:     -1,
      offTrack:        0,
      inPitStall:      1,
      approachingPits: 2,
      onTrack:         3
    },
    displayUnits: {
      // iRacing DisplayUnits values
      imperial: 0,
      metric:   1
    }
  },
  mathematical: {
    // meters/second to miles/hour multiplier
    speedMphMultiplier: 2.236936,
    // meters/second to kilometers/hour multiplier
    speedKphMultiplier: 3.6,
    // Vertical acceleration due to gravity at sea level (m/s^2)
    g: 9.80665,
    // Radius of the Earth (km)
    re: 6371.009
  }
}
