// ─── Fire Cabinets ────────────────────────────────────────────────────────────
import fireCabinetSingleSurface   from "@/assets/products/fire-cabinet-single-surface.png";
import fireCabinetSingleRecessed  from "@/assets/products/fire-cabinet-single-recessed.png";
import fireCabinetDouble           from "@/assets/products/fire-cabinet-double.png";
import fireCabinetHorizontal       from "@/assets/products/fire-cabinet-horizontal.png";
import fireCabinetVertical         from "@/assets/products/fire-cabinet-vertical.png";
import fireCabinetHoseReel         from "@/assets/products/fire-cabinet-hose-reel.png";
import fireCabinetLandingValve     from "@/assets/products/fire-cabinet-landing-valve.png";
import fireCabinetFoam             from "@/assets/products/fire-cabinet-foam.png";

// ─── Sprinklers ───────────────────────────────────────────────────────────────
import sprinklerUpright       from "@/assets/products/sprinkler-upright.png";
import sprinklerPendant       from "@/assets/products/sprinkler-pendant.png";
import sprinklerSidewall      from "@/assets/products/sprinkler-sidewall.png";
import sprinklerRecessed      from "@/assets/products/sprinkler-recessed.png";
import sprinklerEsfr          from "@/assets/products/sprinkler-esfr.png";
import sprinklerStorageRack   from "@/assets/products/sprinkler-storage-rack.png";
// Concealed & Quick Response were overlapping (pendant/upright) → replaced with dedicated images
import sprinklerConcealed     from "@/assets/products/sprinkler-concealed.jpg";
import sprinklerQuickResponse from "@/assets/products/sprinkler-quick-response.jpg";

// ─── Fire Pumps ───────────────────────────────────────────────────────────────
// EDJ was overlapping (used pumpElectric) → replaced with dedicated pump set photo
import pumpEdjComplete from "@/assets/products/pump-edj-complete.jpg";             // haseenhabib
import pumpHorizontal  from "@/assets/products/pump-horizontal-split.png";
import pumpVertical    from "@/assets/products/pump-vertical-turbine.png";

// ─── Fire Valves ──────────────────────────────────────────────────────────────
import valveGate             from "@/assets/products/valve-gate.png";
import valveCheck            from "@/assets/products/valve-check.png";
import valveAlarm            from "@/assets/products/valve-alarm.png";
import valvePressureReducing from "@/assets/products/valve-pressure-reducing.png";

// ─── Suppression Systems ──────────────────────────────────────────────────────
// gas/foam/aerosol/kitchen/water-mist/elec-panel all had their own correct images — kept
import suppressionGas         from "@/assets/products/suppression-gas.png";
import suppressionFoam        from "@/assets/products/suppression-foam.png";
import suppressionAerosol     from "@/assets/products/suppression-aerosol.png";
import suppressionKitchenHood from "@/assets/products/suppression-kitchen-hood.png";
import suppressionWaterMist   from "@/assets/products/suppression-water-mist.png";
import suppressionElecPanel   from "@/assets/products/suppression-electrical-panel.png";
// Clean-agent & data-center were overlapping each other → replaced with distinct gaseous image
import suppressionGaseous     from "@/assets/products/suppression-gaseous.jpg";    // haseenhabib

// ─── Fire Alarm Systems ───────────────────────────────────────────────────────
// Addressable panel had its own correct image — kept
import alarmAddressablePanel     from "@/assets/products/alarm-addressable-panel.jpg";
import alarmSmokeDetectorAddr    from "@/assets/products/alarm-smoke-detector-addressable.png";
import alarmHeatDetectorAddr     from "@/assets/products/alarm-heat-detector-addressable.png";
import alarmAddressableModule    from "@/assets/products/alarm-addressable-module.png";
import alarmAddressableSounder   from "@/assets/products/alarm-addressable-sounder.png";
import alarmAddressableCallPoint from "@/assets/products/alarm-addressable-call-point.png";
import alarmConventionalPanel    from "@/assets/products/alarm-conventional-panel.png";
import alarmSmokeDetector        from "@/assets/products/alarm-smoke-detector.png";
import alarmHeatDetector         from "@/assets/products/alarm-heat-detector.png";
import alarmManualCallPoint      from "@/assets/products/alarm-manual-call-point.png";
import alarmSounder              from "@/assets/products/alarm-sounder.png";
import alarmFlasher              from "@/assets/products/alarm-flasher.png";
import alarmSounderBase          from "@/assets/products/alarm-sounder-base.png";

// ─── Detection Systems ────────────────────────────────────────────────────────
import detectorBeam        from "@/assets/products/detector-beam.png";
import detectorFlame       from "@/assets/products/detector-flame.jpg";
// Gas detector had its own correct image — kept
import detectorGas         from "@/assets/products/detector-gas.png";
// Aspirating was using a duct detector (wrong) → replaced with VESDA image
import detectorVesda       from "@/assets/products/detector-aspirating-vesda.jpg";  // haseenhabib
import detectorMultiSensor from "@/assets/products/detector-multi-sensor.png";

// ─── Notification Systems ─────────────────────────────────────────────────────
import notificationSiren        from "@/assets/products/notification-siren.jpg";
import notificationHorn         from "@/assets/products/notification-horn.jpg";
import notificationVoiceEvac    from "@/assets/products/notification-voice-evacuation.jpg";
import notificationAnnouncement from "@/assets/products/notification-announcement.jpg";
import notificationStrobe       from "@/assets/products/notification-strobe.png";

// ─── Fire Alarm Accessories ───────────────────────────────────────────────────
import accessoryAlarmCable  from "@/assets/products/accessory-alarm-cable.png";
import accessoryPsu         from "@/assets/products/accessory-psu.png";
import accessoryModule      from "@/assets/products/accessory-module.png";
import accessoryJunctionBox from "@/assets/products/accessory-junction-box.png";
import accessoryBattery     from "@/assets/products/accessory-battery.jpg";

// ─── Fire Safety Equipment (all had their own correct images — kept) ───────────
import safetyFireExtinguisher from "@/assets/products/safety-fire-extinguisher.png";
import safetyHoseReel         from "@/assets/products/safety-hose-reel.png";
import safetyFireHose         from "@/assets/products/safety-fire-hose.png";
import safetyNozzle           from "@/assets/products/safety-nozzle.png";
import safetyHoseCabinet      from "@/assets/products/safety-hose-cabinet.png";
import safetyFireBlanket      from "@/assets/products/safety-fire-blanket.webp";
import safetyFireBucket       from "@/assets/products/safety-fire-bucket.png";

// ─── PPE Equipment (were all overlapping → now each has a dedicated image) ────
import ppeHeadProtection        from "@/assets/products/ppe-head-protection.jpg";       // haseenhabib
import ppeEyeProtection         from "@/assets/products/ppe-eye-protection.jpg";        // haseenhabib
import ppeHearingProtection     from "@/assets/products/ppe-hearing-protection.jpg";    // haseenhabib
import ppeRespiratoryProtection from "@/assets/products/ppe-respiratory-protection.jpg";// haseenhabib
import ppeFaceProtection        from "@/assets/products/ppe-face-protection.jpg";       // haseenhabib
import ppeHandProtection        from "@/assets/products/ppe-hand-protection.jpg";       // haseenhabib
import ppeBodyProtection        from "@/assets/products/ppe-body-protection.jpg";       // haseenhabib
import ppeFootProtection        from "@/assets/products/ppe-foot-protection.jpg";       // haseenhabib
import ppeFireSuit              from "@/assets/products/ppe-fire-suit.jpg";             // haseenhabib

// ─── Fire Rated Doors ─────────────────────────────────────────────────────────
import doorSteelFireRated  from "@/assets/products/door-steel-fire-rated.png";
// Wooden door was overlapping (same image as steel) → replaced
import doorFireRatedHh     from "@/assets/products/door-fire-rated-hh.jpg";             // haseenhabib
import doorEmergencyExit   from "@/assets/products/door-emergency-exit.png";
import doorDoubleLeaf      from "@/assets/products/door-double-leaf.png";
import doorSingleLeaf      from "@/assets/products/door-single-leaf.png";
import doorPanicBar        from "@/assets/products/door-panic-bar.png";
import doorAcoustic        from "@/assets/products/door-acoustic.png";
import doorAccPanicBar     from "@/assets/products/door-acc-panic-bar.png";
import doorAccCloser       from "@/assets/products/door-acc-closer.png";
import doorAccHinge        from "@/assets/products/door-acc-hinge.png";
import doorAccVisionPanel  from "@/assets/products/door-acc-vision-panel.png";
import doorAccSeal         from "@/assets/products/door-acc-seal.png";

// ─── Emergency / Exit Signs & Lights ─────────────────────────────────────────
import emergencyExitSign        from "@/assets/products/emergency-exit-sign.png";
import emergencyLedExit         from "@/assets/products/emergency-led-exit.png";
import emergencyPhotolumSign    from "@/assets/products/emergency-photolum-sign.png";
import emergencyDoubleSign      from "@/assets/products/emergency-double-sign.png";
import emergencyDirectionalSign from "@/assets/products/emergency-directional-sign.png";

// ─── Slug → Image map ─────────────────────────────────────────────────────────
export const PRODUCT_IMAGES: Record<string, string> = {
  // Fire Cabinets — all unique, untouched
  "single-door-surface-mounted-cabinet": fireCabinetSingleSurface,
  "single-door-recessed-cabinet":        fireCabinetSingleRecessed,
  "double-door-fire-cabinet":            fireCabinetDouble,
  "horizontal-fire-cabinet":             fireCabinetHorizontal,
  "vertical-fire-cabinet":               fireCabinetVertical,
  "hose-reel-cabinet":                   fireCabinetHoseReel,
  "landing-valve-cabinet":               fireCabinetLandingValve,
  "foam-system-cabinet":                 fireCabinetFoam,

  // Sprinklers — unique images kept; concealed & quick-response were overlapping → fixed
  "upright-sprinklers":        sprinklerUpright,
  "pendant-sprinklers":        sprinklerPendant,
  "sidewall-sprinklers":       sprinklerSidewall,
  "recessed-sprinklers":       sprinklerRecessed,
  "esfr-sprinklers":           sprinklerEsfr,
  "storage-rack-sprinklers":   sprinklerStorageRack,
  "concealed-sprinklers":      sprinklerConcealed,
  "quick-response-sprinklers": sprinklerQuickResponse,

  // Fire Pumps — EDJ was overlapping (used pumpElectric) → fixed
  "edj-complete-pump-set":       pumpEdjComplete,
  "horizontal-split-case-pumps": pumpHorizontal,
  "vertical-turbine-pumps":      pumpVertical,

  // Fire Valves — all unique, untouched
  "gate-valves":              valveGate,
  "check-valves":             valveCheck,
  "alarm-valves":             valveAlarm,
  "pressure-reducing-valves": valvePressureReducing,

  // Suppression — gas/foam/aerosol/kitchen/water-mist/elec-panel had correct images, kept
  // clean-agent & data-center were overlapping each other → replaced with suppressionGaseous
  "gas-suppression-systems":              suppressionGas,
  "foam-suppression-systems":             suppressionFoam,
  "aerosol-suppression-systems":          suppressionAerosol,
  "kitchen-hood-suppression-systems":     suppressionKitchenHood,
  "water-mist-systems":                   suppressionWaterMist,
  "clean-agent-suppression-systems":      suppressionGaseous,
  "electrical-panel-suppression-systems": suppressionElecPanel,
  "data-center-fire-suppression-systems": suppressionGaseous,

  // Addressable Fire Alarm — all had correct images, untouched
  "addressable-fire-alarm-panels":  alarmAddressablePanel,
  "intelligent-smoke-detectors":    alarmSmokeDetectorAddr,
  "intelligent-heat-detectors":     alarmHeatDetectorAddr,
  "addressable-modules":            alarmAddressableModule,
  "addressable-sounders":           alarmAddressableSounder,
  "addressable-manual-call-points": alarmAddressableCallPoint,

  // Conventional Fire Alarm — all had correct images, untouched
  "conventional-fire-alarm-panels": alarmConventionalPanel,
  "smoke-detectors":                alarmSmokeDetector,
  "heat-detectors":                 alarmHeatDetector,
  "manual-call-points":             alarmManualCallPoint,
  "alarm-sounders":                 alarmSounder,
  "flashers":                       alarmFlasher,
  "sounder-bases":                  alarmSounderBase,

  // Detection — all had correct images; aspirating was wrong (duct detector) → fixed with VESDA
  "beam-detectors":                     detectorBeam,
  "flame-detectors":                    detectorFlame,
  "gas-detectors":                      detectorGas,
  "aspirating-smoke-detection-systems": detectorVesda,
  "multi-sensor-detectors":             detectorMultiSensor,

  // Notification Systems — all had correct images, untouched
  "alarm-sirens":                   notificationSiren,
  "horn-speakers":                  notificationHorn,
  "voice-evacuation-systems":       notificationVoiceEvac,
  "emergency-announcement-systems": notificationAnnouncement,
  "strobe-lights":                  notificationStrobe,

  // Fire Alarm Accessories — all had correct images, untouched
  "fire-alarm-cables":  accessoryAlarmCable,
  "batteries":          accessoryBattery,
  "power-supply-units": accessoryPsu,
  "modules":            accessoryModule,
  "junction-boxes":     accessoryJunctionBox,

  // Emergency Exit Systems — had correct images, untouched
  "emergency-exit-signs":        emergencyExitSign,
  "led-exit-signs":              emergencyLedExit,
  "photoluminescent-exit-signs": emergencyPhotolumSign,
  "double-side-exit-signs":      emergencyDoubleSign,
  "emergency-directional-signs": emergencyDirectionalSign,

  // Fire Safety Equipment — all had correct images, untouched
  "fire-blankets":      safetyFireBlanket,
  "fire-buckets":       safetyFireBucket,
  "fire-extinguishers": safetyFireExtinguisher,
  "fire-hose-reels":    safetyHoseReel,
  "fire-hoses":         safetyFireHose,
  "nozzles":            safetyNozzle,
  "hose-cabinets":      safetyHoseCabinet,

  // Safety Equipment / PPE — were ALL using fire extinguisher image → now each has dedicated photo
  "safety-gloves":             ppeHandProtection,
  "fire-resistant-gloves":     ppeHandProtection,
  "industrial-safety-gloves":  ppeHandProtection,
  "safety-helmets":            ppeHeadProtection,
  "safety-goggles":            ppeEyeProtection,
  "reflective-safety-jackets": ppeBodyProtection,
  "safety-shoes":              ppeFootProtection,
  "face-shields":              ppeFaceProtection,

  // PPE Equipment — were ALL using fire extinguisher image → now each has dedicated photo
  "respirators":                  ppeRespiratoryProtection,
  "ear-protection":               ppeHearingProtection,
  "protective-coveralls":         ppeBodyProtection,
  "chemical-protection-suits":    ppeBodyProtection,
  "welding-protection-equipment": ppeFireSuit,

  // Fire Rated Doors — steel/emergency/double/single/panic/acoustic had unique images, kept
  // Wooden door was sharing steel door image → replaced
  "steel-fire-rated-doors":  doorSteelFireRated,
  "wooden-fire-rated-doors": doorFireRatedHh,
  "emergency-exit-doors":    doorEmergencyExit,
  "double-leaf-fire-doors":  doorDoubleLeaf,
  "single-leaf-fire-doors":  doorSingleLeaf,
  "panic-bar-doors":         doorPanicBar,
  "acoustic-fire-doors":     doorAcoustic,

  // Door Accessories — all had correct images, untouched
  "panic-bars":        doorAccPanicBar,
  "door-closers":      doorAccCloser,
  "fire-rated-hinges": doorAccHinge,
  "vision-panels":     doorAccVisionPanel,
  "door-seals":        doorAccSeal,
};

export function getProductImage(slug: string): string | undefined {
  return PRODUCT_IMAGES[slug];
}
