import { Unit } from "@/components/conversions/Converter";

// Units for Angles
const angleUnits: Unit[] = [
    { name: "Degrees", symbol: "°", ratio: 1 },
    { name: "Radians", symbol: "rad", ratio: 0.0174533 },
    { name: "Gradians", symbol: "gon", ratio: 1.11111 }
];

// Units for Areas
const areaUnits: Unit[] = [
    { name: "Square Meters", symbol: "m²", ratio: 1 },
    { name: "Square Kilometers", symbol: "km²", ratio: 0.000001 },
    { name: "Square Centimeters", symbol: "cm²", ratio: 10000 },
    { name: "Square Millimeters", symbol: "mm²", ratio: 1e6 },
    { name: "Hectares", symbol: "ha", ratio: 0.0001 },
    { name: "Acres", symbol: "ac", ratio: 0.000247105 },
    { name: "Square Miles", symbol: "mi²", ratio: 3.861e-7 },
    { name: "Square Yards", symbol: "yd²", ratio: 1.19599 },
    { name: "Square Feet", symbol: "ft²", ratio: 10.7639 },
    { name: "Square Inches", symbol: "in²", ratio: 1550 }
];

// Units for Distances
const distanceUnits: Unit[] = [
    { name: "Meters", symbol: "m", ratio: 1 },
    { name: "Kilometers", symbol: "km", ratio: 0.001 },
    { name: "Centimeters", symbol: "cm", ratio: 100 },
    { name: "Millimeters", symbol: "mm", ratio: 1000 },
    { name: "Micrometers", symbol: "µm", ratio: 1e6 },
    { name: "Nanometers", symbol: "nm", ratio: 1e9 },
    { name: "Miles", symbol: "mi", ratio: 0.000621371 },
    { name: "Yards", symbol: "yd", ratio: 1.09361 },
    { name: "Feet", symbol: "ft", ratio: 3.28084 },
    { name: "Inches", symbol: "in", ratio: 39.3701 },
    { name: "Nautical Miles", symbol: "nmi", ratio: 0.000539957 },
    { name: "Light Years", symbol: "ly", ratio: 1.057e-16 },
    { name: "Astronomical Units", symbol: "AU", ratio: 6.68459e-12 },
    { name: "Parsecs", symbol: "pc", ratio: 3.24078e-17 }
];

// Units for Energies
const energyUnits: Unit[] = [
    { name: "Joules", symbol: "J", ratio: 1 },
    { name: "Kilojoules", symbol: "kJ", ratio: 0.001 },
    { name: "Calories", symbol: "cal", ratio: 0.239006 },
    { name: "Kilocalories", symbol: "kcal", ratio: 0.000239006 },
    { name: "Watt-hours", symbol: "Wh", ratio: 0.000277778 },
    { name: "Kilowatt-hours", symbol: "kWh", ratio: 2.77778e-7 },
    { name: "British Thermal Units", symbol: "BTU", ratio: 0.000947817 }
];

// Units for Forces
const forceUnits: Unit[] = [
    { name: "Newtons", symbol: "N", ratio: 1 },
    { name: "Kilonewtons", symbol: "kN", ratio: 0.001 },
    { name: "Pound-force", symbol: "lbf", ratio: 0.224809 },
    { name: "Dynes", symbol: "dyn", ratio: 100000 }
];

// Units for Frequencies
const frequencyUnits: Unit[] = [
    { name: "Hertz", symbol: "Hz", ratio: 1 },
    { name: "Kilohertz", symbol: "kHz", ratio: 0.001 },
    { name: "Megahertz", symbol: "MHz", ratio: 0.000001 },
    { name: "Gigahertz", symbol: "GHz", ratio: 1e-9 }
];

// Units for Fuel Consumptions
const fuelConsumptionUnits: Unit[] = [
    { name: "Liters per 100 Kilometers", symbol: "L/100km", ratio: 1 },
    { name: "Miles per Gallon (US)", symbol: "mpg (US)", ratio: 235.215 },
    { name: "Miles per Gallon (UK)", symbol: "mpg (UK)", ratio: 282.481 }
];

// Units for Luminances
const luminanceUnits: Unit[] = [
    { name: "Candelas per Square Meter", symbol: "cd/m²", ratio: 1 },
    { name: "Lumens per Square Meter", symbol: "lm/m²", ratio: 1 },
    { name: "Foot-Lamberts", symbol: "fL", ratio: 0.2919 }
];

// Units for Powers
const powerUnits: Unit[] = [
    { name: "Watts", symbol: "W", ratio: 1 },
    { name: "Kilowatts", symbol: "kW", ratio: 0.001 },
    { name: "Horsepower (metric)", symbol: "hp", ratio: 0.00135962 },
    { name: "Horsepower (mechanical)", symbol: "hp", ratio: 0.00134102 }
];

// Units for Pressures
const pressureUnits: Unit[] = [
    { name: "Pascals", symbol: "Pa", ratio: 1 },
    { name: "Kilopascals", symbol: "kPa", ratio: 0.001 },
    { name: "Bar", symbol: "bar", ratio: 0.00001 },
    { name: "Atmospheres", symbol: "atm", ratio: 9.86923e-6 },
    { name: "Millimeters of Mercury", symbol: "mmHg", ratio: 0.00750062 },
    { name: "Inches of Mercury", symbol: "inHg", ratio: 0.0002953 },
    { name: "Pounds per Square Inch", symbol: "psi", ratio: 0.000145038 }
];

// Units for Speeds
const speedUnits: Unit[] = [
    { name: "Meters per Second", symbol: "m/s", ratio: 1 },
    { name: "Kilometers per Hour", symbol: "km/h", ratio: 3.6 },
    { name: "Miles per Hour", symbol: "mph", ratio: 2.23694 },
    { name: "Feet per Second", symbol: "ft/s", ratio: 3.28084 },
    { name: "Knots", symbol: "kn", ratio: 1.94384 }
];

// Units for Temperatures
const temperatureUnits: Unit[] = [
    { name: "Celsius", symbol: "°C", ratio: 1 },
    { name: "Fahrenheit", symbol: "°F", ratio: 1.8, offset: 32 },
    { name: "Kelvin", symbol: "K", ratio: 1, offset: 273.15 }
];

// Units for Masses
const massUnits: Unit[] = [
    { name: "Kilograms", symbol: "kg", ratio: 1 },
    { name: "Grams", symbol: "g", ratio: 1000 },
    { name: "Milligrams", symbol: "mg", ratio: 1e6 },
    { name: "Micrograms", symbol: "µg", ratio: 1e9 },
    { name: "Metric Tons", symbol: "t", ratio: 0.001 },
    { name: "Pounds", symbol: "lb", ratio: 2.20462 },
    { name: "Ounces", symbol: "oz", ratio: 35.274 },
    { name: "Stones", symbol: "st", ratio: 0.157473 },
    { name: "Tons (US)", symbol: "ton", ratio: 0.00110231 },
    { name: "Tons (UK)", symbol: "ton", ratio: 0.000984207 }
];

// Units for Volumes
const volumeUnits: Unit[] = [
    { name: "Cubic Meters", symbol: "m³", ratio: 1 },
    { name: "Liters", symbol: "L", ratio: 1000 },
    { name: "Milliliters", symbol: "mL", ratio: 1e6 },
    { name: "Cubic Centimeters", symbol: "cm³", ratio: 1e6 },
    { name: "Cubic Inches", symbol: "in³", ratio: 61023.7 },
    { name: "Cubic Feet", symbol: "ft³", ratio: 35.3147 },
    { name: "Gallons (US)", symbol: "gal", ratio: 264.172 },
    { name: "Gallons (UK)", symbol: "gal", ratio: 219.969 },
    { name: "Quarts (US)", symbol: "qt", ratio: 1056.69 },
    { name: "Pints (US)", symbol: "pt", ratio: 2113.38 }
];

// Units for Data Storage
const dataStorageUnits: Unit[] = [
    { name: "Bytes", symbol: "B", ratio: 1 },
    { name: "Kilobytes", symbol: "KB", ratio: 1024 },
    { name: "Megabytes", symbol: "MB", ratio: 1024 ** 2 },
    { name: "Gigabytes", symbol: "GB", ratio: 1024 ** 3 },
    { name: "Terabytes", symbol: "TB", ratio: 1024 ** 4 },
    { name: "Petabytes", symbol: "PB", ratio: 1024 ** 5 },
    { name: "Exabytes", symbol: "EB", ratio: 1024 ** 6 },
    { name: "Zettabytes", symbol: "ZB", ratio: 1024 ** 7 },
    { name: "Yottabytes", symbol: "YB", ratio: 1024 ** 8 }
];

// Units for Time
const timeUnits: Unit[] = [
    { name: "Seconds", symbol: "s", ratio: 1 },
    { name: "Minutes", symbol: "min", ratio: 1 / 60 },
    { name: "Hours", symbol: "h", ratio: 1 / 3600 },
    { name: "Days", symbol: "d", ratio: 1 / 86400 },
    { name: "Weeks", symbol: "wk", ratio: 1 / 604800 },
    { name: "Months", symbol: "mo", ratio: 1 / 2.628e6 },
    { name: "Years", symbol: "yr", ratio: 1 / 3.154e7 }
];

// Units for Accelerations
const accelerationUnits: Unit[] = [
    { name: "Meters per Second Squared", symbol: "m/s²", ratio: 1 },
    { name: "Feet per Second Squared", symbol: "ft/s²", ratio: 3.28084 },
    { name: "Standard Gravity", symbol: "g", ratio: 0.101972 },
];

// Units for Electric Currents
const currentUnits: Unit[] = [
    { name: "Amperes", symbol: "A", ratio: 1 },
    { name: "Milliamperes", symbol: "mA", ratio: 1000 },
    { name: "Kiloamperes", symbol: "kA", ratio: 0.001 },
];

// Units for Voltages
const voltageUnits: Unit[] = [
    { name: "Volts", symbol: "V", ratio: 1 },
    { name: "Millivolts", symbol: "mV", ratio: 1000 },
    { name: "Kilovolts", symbol: "kV", ratio: 0.001 },
];

// Units for Resistances
const resistanceUnits: Unit[] = [
    { name: "Ohms", symbol: "Ω", ratio: 1 },
    { name: "Milliohms", symbol: "mΩ", ratio: 1000 },
    { name: "Kiloohms", symbol: "kΩ", ratio: 0.001 },
    { name: "Megaohms", symbol: "MΩ", ratio: 1e-6 },
];

// Units for Electric Charges
const chargeUnits: Unit[] = [
    { name: "Coulombs", symbol: "C", ratio: 1 },
    { name: "Ampere-hours", symbol: "Ah", ratio: 1 / 3600 },
    { name: "Milliampere-hours", symbol: "mAh", ratio: 1000 / 3600 },
];

// Units for Capacitances
const capacitanceUnits: Unit[] = [
    { name: "Farads", symbol: "F", ratio: 1 },
    { name: "Millifarads", symbol: "mF", ratio: 1000 },
    { name: "Microfarads", symbol: "μF", ratio: 1e6 },
    { name: "Nanofarads", symbol: "nF", ratio: 1e9 },
    { name: "Picofarads", symbol: "pF", ratio: 1e12 },
];

// Units for Inductances
const inductanceUnits: Unit[] = [
    { name: "Henrys", symbol: "H", ratio: 1 },
    { name: "Millihenrys", symbol: "mH", ratio: 1000 },
    { name: "Microhenrys", symbol: "μH", ratio: 1e6 },
];

// Units for Magnetic Fields
const magneticFieldUnits: Unit[] = [
    { name: "Teslas", symbol: "T", ratio: 1 },
    { name: "Gauss", symbol: "G", ratio: 10000 },
];

// Units for Radiation Doses
const radiationDoseUnits: Unit[] = [
    { name: "Grays", symbol: "Gy", ratio: 1 },
    { name: "Rads", symbol: "rad", ratio: 100 },
    { name: "Sieverts", symbol: "Sv", ratio: 1 },
    { name: "Rems", symbol: "rem", ratio: 100 },
];

// Units for Radioactivity
const radioactivityUnits: Unit[] = [
    { name: "Becquerels", symbol: "Bq", ratio: 1 },
    { name: "Curies", symbol: "Ci", ratio: 2.7027e-11 },
];

// Units for Concentrations
const concentrationUnits: Unit[] = [
    { name: "Moles per Liter", symbol: "mol/L", ratio: 1 },
    { name: "Grams per Liter", symbol: "g/L", ratio: 1 }, // Conversion dépend de la masse molaire
    { name: "Percent Mass", symbol: "% m/m", ratio: 1 }, // Nécessite un contexte supplémentaire
    { name: "Percent Volume", symbol: "% v/v", ratio: 1 },
    { name: "Parts per Million", symbol: "ppm", ratio: 1e6 },
];

// Units for Flow Rates
const flowRateUnits: Unit[] = [
    { name: "Cubic Meters per Second", symbol: "m³/s", ratio: 1 },
    { name: "Liters per Minute", symbol: "L/min", ratio: 60000 },
    { name: "Cubic Feet per Second", symbol: "ft³/s", ratio: 35.3147 },
    { name: "Gallons per Minute (US)", symbol: "gal/min", ratio: 15850.3 },
];

// Units for Densities
const densityUnits: Unit[] = [
    { name: "Kilograms per Cubic Meter", symbol: "kg/m³", ratio: 1 },
    { name: "Grams per Cubic Centimeter", symbol: "g/cm³", ratio: 0.001 },
    { name: "Pounds per Cubic Foot", symbol: "lb/ft³", ratio: 0.06242796 },
];

// Units for Torques
const torqueUnits: Unit[] = [
    { name: "Newton Meters", symbol: "N·m", ratio: 1 },
    { name: "Pound-feet", symbol: "lb·ft", ratio: 0.737562 },
    { name: "Pound-inches", symbol: "lb·in", ratio: 8.85075 },
];

// Units for Sound Levels
const soundLevelUnits: Unit[] = [
    { name: "Decibels", symbol: "dB", ratio: 1 },
];

// Units for Illuminance
const illuminanceUnits: Unit[] = [
    { name: "Lux", symbol: "lx", ratio: 1 },
    { name: "Foot-candles", symbol: "fc", ratio: 0.092903 },
];

// Units for Viscosities
const viscosityUnits: Unit[] = [
    { name: "Pascal Seconds", symbol: "Pa·s", ratio: 1 },
    { name: "Poise", symbol: "P", ratio: 10 },
    { name: "Centipoise", symbol: "cP", ratio: 1000 },
];

// Units for Kinematic Viscosities
const kinematicViscosityUnits: Unit[] = [
    { name: "Square Meters per Second", symbol: "m²/s", ratio: 1 },
    { name: "Stokes", symbol: "St", ratio: 10000 },
    { name: "Centistokes", symbol: "cSt", ratio: 1e6 },
];

// Units for Solid Angles
const solidAngleUnits: Unit[] = [
    { name: "Steradians", symbol: "sr", ratio: 1 },
    { name: "Square Degrees", symbol: "deg²", ratio: (180 / Math.PI) ** 2 },
];

// Units for Culinary Volumes
const culinaryVolumeUnits: Unit[] = [
    { name: "Milliliters", symbol: "mL", ratio: 1 },
    { name: "Teaspoons", symbol: "tsp", ratio: 0.202884 },
    { name: "Tablespoons", symbol: "tbsp", ratio: 0.067628 },
    { name: "Cups", symbol: "cup", ratio: 0.00422675 },
    { name: "Fluid Ounces (US)", symbol: "fl oz", ratio: 0.033814 },
    { name: "Pints (US)", symbol: "pt", ratio: 0.00211338 },
    { name: "Quarts (US)", symbol: "qt", ratio: 0.00105669 },
    { name: "Gallons (US)", symbol: "gal", ratio: 0.000264172 },
];

// Units for Culinary Weights
const culinaryWeightUnits: Unit[] = [
    { name: "Grams", symbol: "g", ratio: 1 },
    { name: "Kilograms", symbol: "kg", ratio: 0.001 },
    { name: "Ounces", symbol: "oz", ratio: 0.035274 },
    { name: "Pounds", symbol: "lb", ratio: 0.00220462 },
];

// Units for Food Energy
const foodEnergyUnits: Unit[] = [
    { name: "Calories", symbol: "cal", ratio: 1 },
    { name: "Kilocalories", symbol: "kcal", ratio: 0.001 },
    { name: "Joules", symbol: "J", ratio: 4.184 },
    { name: "Kilojoules", symbol: "kJ", ratio: 0.004184 },
];

// Units for Data Transfer Rates
const dataTransferRateUnits: Unit[] = [
    { name: "Bits per Second", symbol: "bps", ratio: 1 },
    { name: "Kilobits per Second", symbol: "kbps", ratio: 0.001 },
    { name: "Megabits per Second", symbol: "Mbps", ratio: 0.000001 },
    { name: "Gigabits per Second", symbol: "Gbps", ratio: 1e-9 },
    { name: "Bytes per Second", symbol: "Bps", ratio: 0.125 },
    { name: "Kilobytes per Second", symbol: "kBps", ratio: 0.000125 },
    { name: "Megabytes per Second", symbol: "MBps", ratio: 1.25e-7 },
    { name: "Gigabytes per Second", symbol: "GBps", ratio: 1.25e-10 },
];

// Units for Molar Masses
const molarMassUnits: Unit[] = [
    { name: "Grams per Mole", symbol: "g/mol", ratio: 1 },
    { name: "Kilograms per Mole", symbol: "kg/mol", ratio: 0.001 },
    { name: "Pounds per Mole", symbol: "lb/mol", ratio: 0.00220462 },
];


export const units: {
    [key: string]: Unit[];
} = {
    "/": angleUnits,
    "/angles": angleUnits,
    "/solid-angles": solidAngleUnits,
    "/areas": areaUnits,
    "/distances": distanceUnits,
    "/accelerations": accelerationUnits,
    "/energies": energyUnits,
    "/forces": forceUnits,
    "/frequencies": frequencyUnits,
    "/magnetic-fields": magneticFieldUnits,
    "/flow-rates": flowRateUnits,
    "/viscosities": viscosityUnits,
    "/kinematic-viscosities": kinematicViscosityUnits,
    "/fuel-consumptions": fuelConsumptionUnits,
    "/luminances": luminanceUnits,
    "/illuminance": illuminanceUnits,
    "/masses": massUnits,
    "/densities": densityUnits,
    "/molar-masses": molarMassUnits,
    "/powers": powerUnits,
    "/pressures": pressureUnits,
    "/speeds": speedUnits,
    "/temperatures": temperatureUnits,
    "/torques": torqueUnits,
    "/volumes": volumeUnits,
    "/sound-levels": soundLevelUnits,
    "/radiation-doses": radiationDoseUnits,
    "/radioactivity": radioactivityUnits,
    "/currents": currentUnits,
    "/voltages": voltageUnits,
    "/resistances": resistanceUnits,
    "/capacitances": capacitanceUnits,
    "/inductances": inductanceUnits,
    "/charges": chargeUnits,
    "/concentrations": concentrationUnits,
    "/times": timeUnits,
    "/data": dataStorageUnits,
    "/data-transfer-rates": dataTransferRateUnits,
    "/culinary-volumes": culinaryVolumeUnits,
    "/culinary-weights": culinaryWeightUnits,
    "/food-energy": foodEnergyUnits
};
