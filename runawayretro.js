// @title runaway retro @by agentmodem

register('fadein', (length, x) => {
 return x.postgain(saw.range(0,1).slow(length)) 
})

register('fadeout', (length, x) => {
 return x.postgain(saw.range(1,0).slow(length)) 
})

const chords = "<Am7 Cadd9 Fadd9 Gadd9>"

const arppp = chord(chords).anchor("c5").voicing()
  .arp("0 1 2 3 2 1 2 1".fast(2))
  .sound("square").n(1).fm(sine.range(0,8).slow(8))
  .chorus(1)
  .gain(0.7)
  .color("hotpink")//._punchcard()

const baaas = chord(chords).rootNotes("2").segment(16)
  .s("tri, sawtooth").n(32)
  .chorus(1).room(1)
  .orbit(2)
  .postgain(1.2)
  .color("indigo")//._punchcard()

const bd4 = s("bd!4").bank("oberheimdmx").n("2,3")
  .duck("2:3").duckattack("0.3:0.2").duckdepth("1:0.5")
  .room(0.6).postgain(0.8)
  .color("cornsilk")//._scope()

const sd24 = s("- sd:2 - sd:2").bank("oberheimdmx").gain(0.6).room(0.8)
  .color("cornsilk")//._scope()

const hh8 = s("hh!8").bank("oberheimdmx").gain(0.3).lpf(4500)
  .color("cornsilk")//._scope()

const drums1 = stack(bd4, sd24, hh8)

const pad = chord(chords).anchor("e4").voicing()
  .s("gm_synth_strings_1:4")
  .orbit(3)
  .room(1)
  .postgain(0.8)
  .color("coral")//._scope()

const lead = n(irand(6)).scale("a4:minor:pentatonic")
  .struct(`<
  [- x@3 x x x@2] 
  [x x - x x x@3] 
  [x!8] 
  [- x - x x x@3]
  >`)
  .s("gm_overdriven_guitar:1").echo(6, 3/16, 0.6)
  .bpf(tri.range(500,4500).slow(4))
  .room(1)
  .postgain(1.5)
  .color("aqua")//._punchcard()
const carstart = s("gm_helicopter").n("5").room(0.5)
  .color("darkgrey")//._scope()

const brass = chord(chords).anchor("e4").mode("above").voicing().arp("4 - 3 - 2 - 0 -")
  .s("gm_synth_brass_1:3").echoWith(4, 1/8, (p,n) => p.hpf(n*1500)).color("violet")

const slowlead = n(`<
[0 1 3 2][3 4 6 5][6 7 9 8][9 10 12 11]
>`).scale("a4:minor:pentatonic").s("gm_overdriven_guitar:1").echo(6, 3/8, 0.6)
  .bpf(tri.range(100,6000).slow(4))
  .room(1)
  .postgain(1.5)
  .color("aqua")//._punchcard()

song: arrange(
  [1, carstart.hush()],
  [1, carstart.slow(29)], 
  [4, pad], 
  [8, stack(pad, baaas)], 
  [8, stack(pad, baaas, arppp.fadein(8))], 
  [12, stack(pad, baaas, arppp)], 
  [4, stack(pad, baaas, arppp).hpf(saw.range(0,2500).slow(4)).mask(`<1!3 [1@3 0]>`)], 
  [8, stack(bd4, pad, baaas, arppp)], 
  [8, stack(bd4, sd24, pad, baaas, arppp)], 
  [8, stack(drums1, pad, baaas, arppp)], 
  [16, stack(drums1, pad, baaas, arppp, lead)], 
  [16, stack(drums1, pad, baaas, lead)], 
  [16, stack(drums1.mask(`<1!8 0!8>`), bd4.mask(`<0!8 1!8>`), baaas, pad.mask(`<1!8 0!8>`)).lpf(tri.range(5000,0).slow(16))], 
  [8, stack(bd4, baaas, brass)],
  [16, stack(bd4, baaas, brass, slowlead)],
  [8, stack(slowlead, brass, pad.fadein(8)).mask(`<1!7 [1@3 0]>`)],
  [24, stack(drums1, baaas, pad, arppp, lead)],
  [8, stack(drums1, baaas, pad, arppp, lead.fadeout(8))],
  [16, stack(drums1, baaas, pad, arppp)],
  [8, stack(drums1, baaas, pad.fadeout(8))],
  [4, stack(bd4, sd24, baaas)],
  [4, stack(bd4, baaas, slowlead)],
  [4, stack(bd4, baaas.fadeout(4), slowlead).hpf(saw.range(0,2000).slow(4))],
  [2, bd4.hush()]  
)//.early(110)
  .pianoroll({
  labels:1,
  //vertical:1, 
  hideInactive:0,
  //fillActive:1,
  fold:1,
  autorange:1,
  smear:0
 })
