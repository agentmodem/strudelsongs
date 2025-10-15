// @title castle music @by agentmodem

const chords = "<Dm BbM Gm Am7>"
const powerchords = "<D5 Bb5 G5 A5>"
const rainbow = "darkred red orange yellow green blue purple violet"
const pastel = "<pink white lightblue lightgreen>"

// Main

const arp = n(irand(8).ribbon(20, 16))
  .chord(chords).anchor("f3")
  .struct("x!16").sound("supersaw")
  .voicing().velocity(1.5)
  .lpf(tri.range(200,2000).slow(16)).room(0.8)
  .color(rainbow)

const chug = chord(powerchords).anchor("d3").mode("above").voicing().struct("x - x - x!4 x - x - x!4")
  .sound("gm_electric_guitar_muted:6").attack(0.02).release(0.2).room(0.7).lpf(3500)
  .gain(0.7).color(rainbow)

const maindrums = s(`<
       [bd - [bd bd] -][bd - [bd bd] [- bd]],
       [- sd - sd]     [- sd - sd]
       >`).bank("tr909")
  .stack(s("hh").bank("dr110").struct("x!8").sometimesBy(0.3, n => n.ply("2")))
  .room(0.2).lpf(2000).color(rainbow)

const organbass = note("D2 F2 Bb2 F2 G2 Bb2 A2 C2").slow(4)
  .sound("gm_rock_organ:3")
  .gain(1.5).room(0.5).color(rainbow)

const leadguitar = n(irand(7).ribbon(12, 4))
  .struct("x!4").degradeBy(0.2)
  .scale("d4:minor")
  .sound("gm_distortion_guitar:5").attack(0.1).velocity(0.7)
  .echo(4, 3/8, 0.4)
  .lpf(4000)
  .room(0.6)
  .color(rainbow)

const needlyneedly = n(`<
  [[3 2 1 0]!4]
  [[4 3 2 1]!4]
  [[5 4 3 2]!4]
  [[6 5 4 3]!4]
  >`).scale("d4:minor:pentatonic")
  .sound("gm_overdriven_guitar:0")
  .echo(4, 3/32, 0.3)
  .room(0.8)
  .color(rainbow)



// Bridge

const slowpad = chord(powerchords).slow(2)
  .voicing().s("gm_pad_new_age:5").attack(1).release(1)
  .color(pastel)


const slowdrums = s(`<
       [bd sd bd [bd bd]]
       >`).bank("tr909").stack(s("hh!12").bank("dr110"))
  .room(0.2).lpf(2000).color(pastel)

const sparkle = n("7 6 5 4 3 2 1 0")
  .degradeBy(0.6).ribbon(60, 4)
  .chord(chords).anchor("d5").mode("above").voicing()
  .sound("gm_pad_new_age:12").delay(0.3).room(2).color(pastel)
 

// structure

$: arrange(
  [1, chug.hush()],
  [4, chug],
  [8, stack(chug, maindrums, organbass)],
  [16, stack(leadguitar, chug, maindrums, organbass)],
  [16, stack(arp, leadguitar, chug, maindrums, organbass)],
  [16, stack(arp, leadguitar, maindrums, organbass)],
  [16, stack(arp, maindrums, organbass)],
  [16, stack(arp.velocity(saw.range(1,0).slow(16)), slowpad.velocity(saw.range(0,1).slow(16)))], // transition mm 77
  [16, stack(slowpad, slowdrums)],
  [32, stack(sparkle, slowpad, slowdrums)],
  [4, sparkle], //transtion mm 141
  [4, stack(sparkle, chug)],
  [16, stack(sparkle, chug, organbass, maindrums)],
  [16, stack(chug, organbass, maindrums, arp.velocity(saw.range(0,1).slow(16)))],
  [16, stack(arp, leadguitar, maindrums, organbass)], //mm 181
  [16, stack(arp, maindrums, organbass, needlyneedly.hpf(saw.range(5000,0).slow(16)).velocity(saw.range(0,1).slow(16)))],
  [8, stack(needlyneedly, arp)],
  [4, chug.hush()]
).scope().early(181)

