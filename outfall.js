// @title outfall @by agentmodem

setcpm(100/4)

register('fadein', (length, x) => {
 return x.velocity(saw.range(0,1).slow(length)) 
})

register('fadeout', (length, x) => {
 return x.velocity(saw.range(1,0).slow(length)) 
})

const string = n("<0 2 5 -1>")
  .scale("e2:harmonic:minor")
  .s("gm_string_ensemble_1")
  .orbit(2).color("grey")

const string2 = n("<[0@3 1] [2 4] [5@3 7] [6@3 1 -1]>")
  .scale("e3:harmonic:minor")
  .s("gm_string_ensemble_1")
  .color("grey")

const drone = note("e2").seg(16).s("square")
  .fm(saw.range(2,8).slow(4)).sometimesBy(0.2, x => x.fmh(3))
  .gain(0.3).room(0.8).color("black")
  .scope({scale:1})

const drone2 = n("<0 2 5 -1>")
  .scale("e1:harmonic:minor").seg(16).s("square")
  .fm(saw.range(2,8).slow(4)).sometimesBy(0.2, x => x.fmh(3))
  .gain(0.5).room(0.8)
  .orbit(3)
  .color("black")
  .scope({scale:1})


const bd1 = s("bd!4").bank("korgm1").duck("2:3").duckattack("0.15:0.2").duckdepth("0.9:1").color("darkblue")

const hh1 = s("- hh").fast(4)
  .bank("korgm1").gain(0.5)
  .room(0.3).color("darkblue")

const sd1 = s("<[- sd - sd]!3 <[- sd - sd*2] [- sd sd*2 sd*4]>>")
  .bank("korgm1").n(2)
  .room(1).color("darkblue")

const sdtran = s("- - sd*2 sd*4")
  .bank("korgm1").n(2)
  .room(1).color("darkblue")

const drums1 = stack(bd1, hh1, sd1)

const down = n("<7 6 5 4 3 2 1 0> - ").fast(8)
  .scale("e4:harmonic:minor").echo(3, 3/16, 0.8)
  .s("saw").fm(1)
  .bpf(sine.range(400,3000).slow(16))
  .orbit(3)
  .room(0.3)
  .color("violet")

const rando = n(irand(6).ribbon(23, 8).add("0!3 7")).struct("- x x x x - x x")
  .scale("e4:harmonic:minor")
  .s("pulse").fm(8).fmattack(0.3)
  .room(0.6).color("darkred")

const rando2 = n(irand(6).ribbon(23, 8)).struct("-!6 x!2")
  .scale("e5:harmonic:minor").echo(4, 1/4, 0.5)
  .s("gm_lead_5_charang").n(5).postgain(0.4)
  .room(0.6).color("red")

const stab = n("<0 2 5 -1, 4 4 2 4, 7@3 8>").scale("e3:harmonic:minor")
  .struct("<[1 0@15]>")
  .echo(12, 3/16, 0.8).lpf(saw.range(8000, 0).slow(8))
  .s("gm_synth_brass_1").n(4)
  .postgain(0.8)
  .color("purple")

song:arrange(
  [1, drums1.hush()],
  [8, stack(drone.fadein(8), string).mask("1")], 
  [8, stack(bd1, sd1.mask("<0!7 [0 1]>"), drone, string).mask("1")],
  [8, stack(drums1, drone, string).mask("1")],
  [16, stack(drums1, drone, string, down).mask("1")], 
  [4, stack(bd1.mask("<0 0 1 1>"), sdtran.mask("<0 0 0 1>"), drone, stab.restart("<x!2 x*2 [x*2 x*4]>"), down).mask("1")],
  [16, stack(drums1, drone2, string, rando, stab, down).mask("1")],
  [8, stack(stack(stab, string, rando, down).lpf(saw.range(20000, 200).slow(8)), sd1.mask("<0!7 [0 1]>")).mask("1")],
  [16, stack(drums1, drone2, string, stab, rando, rando2, down).mask("1")], 
  [8, stack(rando2, stack(stab, drone2, string, rando, drums1, down).velocity(saw.range(1,0).slow(8))).mask("1")], 
  [8, stack(rando2.mask("<1@7 [1@3 0]>"), string2.mask("<0@4 1@4>"), sd1.mask("<0!7 [0 1]>")).mask("1")], 
  [8, stack(drums1, rando, rando2, string2, stab, drone2).mask("1")],
  [8, stack(drums1, rando, string2, stab, string, drone2, down).mask("1")],
  [8, stack(drums1, rando, stab, string, drone2, down).mask("1")],
  [8, stack(drums1, drone2, stack(stab, down).mask("<1@7 [1 0]>"))],
  [1, stack(drums1, drone2, drone).mask("1 0@7")]
)
