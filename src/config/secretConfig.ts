import type { SecretConfig } from '../types/game';

/**
 * ✏️  ARCHIVO DE PERSONALIZACIÓN
 * Edita aquí el código, los textos y el regalo. No hace falta tocar ningún componente.
 */
export const secretConfig: SecretConfig = {
  // Cambia la clave si quieres que el progreso guardado de pruebas no se arrastre.
  storageKey: 'golden-secret-irina-v1',
  recipient: 'Irina',

  // ⚠️ PLACEHOLDERS: sustituye cada `char` por el carácter REAL escondido en la tarjeta de ese día.
  // Un solo carácter (número o letra). No distingue mayúsculas/minúsculas.
  // El orden del array es el orden en que Irina debe introducirlos.
  clues: [
    { day: 5, char: 'A' },
    { day: 13, char: 'B' },
    { day: 16, char: 'C' },
    { day: 21, char: 'D' },
  ],

  welcome: {
    classified: 'CLASSIFIED · DEPT. DE MISTERIOS · Nº 23',
    title: 'THE GOLDEN SECRET',
    subtitle: 'Four clues. One secret. One golden envelope.',
    quote: 'Irina, hay secretos que no se pueden descubrir en un solo día.',
    intro:
      'Esta noche una lechuza ha entrado por la ventana con un sobre sin remitente. Dentro, una nota: «Alguien ha escondido un secreto en una cámara de Gringotts. Cuatro guardianes custodian los fragmentos de su contraseña. Solo una bruja con ingenio suficiente podrá reunirlos». Ha llegado el momento de demostrar que eres tú.',
    button: 'COMENZAR LA MISIÓN',
  },

  // Narrativa del Día 23: cuatro guardianes + cámara de Gringotts.
  story: {
    archiveIntro:
      'Cada guardián protege un fragmento de la contraseña. Supera su prueba para obtenerlo y anótalo: lo necesitarás en la cámara.',
    vaultHint: 'Cámara Nº 23 de Gringotts. Los duendes esperan la contraseña completa.',
    vaultLocked: 'Los duendes de Gringotts no abrirán la cámara hasta que reúnas los cuatro fragmentos.',
    vaultUnlocking: 'Los duendes giran las llaves de la cámara…',
    vaultOpen: '¡Clonk! La cámara de Gringotts se abre.',
    trials: [
      {
        place: 'La Biblioteca Prohibida',
        intro: 'Los libros susurran y los objetos mágicos se esconden de dos en dos. Encuentra las parejas antes de que Madame Pince te descubra.',
        done: 'Un libro se cierra de golpe y deja caer el primer fragmento.',
      },
      {
        place: 'El Sombrero Seleccionador',
        intro: 'El Sombrero te reta: repite el orden en que llama a las cuatro casas, sin equivocarte ni una vez.',
        done: 'El Sombrero sonríe bajo su ala y te entrega el segundo fragmento.',
      },
      {
        place: 'El Campo de Quidditch',
        intro: 'Una snitch dorada cruza el campo. Atrápala justo cuando pase por la zona dorada, tres veces.',
        done: '¡La grada ruge! La snitch te suelta el tercer fragmento al alejarse.',
      },
      {
        place: 'Los Túneles de Gringotts',
        intro: 'Un duende baraja las copas y esconde la snitch bajo una. No le quites ojo a la correcta.',
        done: 'El duende gruñe, admirado, y te entrega el cuarto y último fragmento.',
      },
    ],
  },

  envelope: {
    message:
      'Has conseguido llegar hasta aquí. Entre las monedas de la cámara, una lechuza sostiene un sobre dorado lacrado. Pero todavía queda un secreto por descubrir.',
    button: 'OPEN YOUR GOLDEN ENVELOPE',
  },

  // Se muestra al final del Día 23, al pulsar el botón.
  keyReveal: {
    button: 'REVELAR MI REGALO',
    label: 'TU REGALO · LA CONTRASEÑA DEL GRAN SALÓN',
    text: 'Anótala o haz una captura y guárdala: mañana, en el Día 24, la necesitarás para abrir las puertas del Gran Salón con el último QR.',
  },

  // ===== DÍA 24 · THE GRAND FINALE  (se abre en  /#/dia24  → ponlo en el QR 6) =====
  day24: {
    key: 'ORO24', // ⚠️ PLACEHOLDER: pon aquí la clave real (no distingue mayúsculas ni espacios/guiones)
    gateTitle: 'THE GRAND FINALE',
    gateKicker: 'LAS PUERTAS DEL GRAN SALÓN',
    gateText:
      'Las puertas están cerradas y todo Hogwarts espera dentro, en silencio. Pronuncia la contraseña que te entregó la lechuza en el Día 23.',
    gateError: 'Las puertas no se mueven. Esa no es la contraseña: revisa el pergamino del Día 23.',
    winnerKicker: 'EL GRAN SALÓN SE PONE EN PIE',
    points: '¡MIL PUNTOS PARA IRINA!',
    birthdayTitle: '¡FELIZ CUMPLEAÑOS!',
    letter: {
      greeting: 'Querida Irina:',
      body:
        'Nos complace comunicarte que, tras superar con éxito todas las pruebas, has sido nombrada **GANADORA ABSOLUTA**. Las lechuzas de medio mundo han volado esta noche para llevar la noticia.\n\nHace ya un tiempo que cumpliste 36 años, pero el Ministerio de Magia ha decretado que un cumpleaños de tu categoría no cabe en un solo día. Por eso llevas 24 días de celebración extra y hoy llega el gran final. El castillo entero ha encendido mil velas flotantes en tu honor, aunque el Departamento de Bomberos Mágicos ya ha presentado una queja formal por la cantidad de velas que hacen falta.\n\nSegún los cálculos oficiales, hoy tienes **36 años y 24 días de prórroga**, que es exactamente la edad a la que las grandes brujas empiezan a ponerse interesantes. Para una bruja de tu nivel es una edad más que respetable (Dumbledore tenía 150 y seguía en forma).\n\nPero basta de bromas: hoy toca desear cosas bonitas.\n\nDeseamos que este año se cumplan todos tus deseos, incluso los que todavía no te atreves a decir en voz alta. Que sea un año aún más luminoso y que, cuando mires atrás, reconozcas todo lo que has construido por ti misma. Porque ya eres de esas personas que llegan lejos, aunque a veces no sepas hasta dónde.\n\nDurante estas pruebas has demostrado un ojo clínico digno de la mejor detective: no se te escapa ni una pista. Tienes ese instinto para observar y darte cuenta de lo que a otros se les pasa por alto. No lo pierdas nunca y, sobre todo, no dudes de él: que te siga guiando hacia lo que te hace bien, hacia quienes merecen estar a tu lado y hacia los caminos que te hagan feliz.\n\nOjalá sigas escuchándote con la misma atención y el mismo cariño con los que escuchas las canciones de tus musicales, hasta el último verso. Dentro de ti hay muchas respuestas esperando a ser oídas y, si algo tenemos claro, es que **tu voz también merece su propio número musical**.\n\nQue los viajes te regalen ciudades inolvidables, rincones inesperados y aventuras que algún día recordarás con una sonrisa. Que tus amistades sigan llenándote la vida de risas, abrazos y planes de esos que empiezan sin saber cómo acabarán. Y que nunca te falten la magia, las ganas de descubrir y personas con quienes compartirlo.\n\nPorque si algo demuestra este calendario entero es que hay mucha gente que se alegra de que estés en su vida.\n\n**Por decreto del Gran Salón, hoy mandas tú.**\n\n**¡Feliz cumpleaños, Irina!**',
      signature: 'Con todo nuestro cariño,\nSofia, Azahara, Marta, Ana, MCarmen y Laura Vasca',
    },
    medals: [
      { icon: '🎂', title: 'MEDALLA DE CUMPLEAÑOS', subtitle: 'Un año más de magia' },
      { icon: '👑', title: 'REINA DE LEÓN', subtitle: 'Con el león por emblema' },
    ],
    winnerTitle: 'IRINA',
    winnerSubtitle: 'GANADORA ABSOLUTA',
    message:
      'Has pasado por la Biblioteca Prohibida, ante el Sombrero, sobre el campo de Quidditch y por los túneles de Gringotts. Nadie había llegado tan lejos. La Copa es tuya.',
    video: '', // p. ej. '/ganadora.mp4' (archivo en /public). Vacío = animación de trofeo
    closing: '¡FELIZ CUMPLEAÑOS, IRINA!',
  },

  final: {
    heading: 'IRINA, HAS DESBLOQUEADO TU REGALO.',
    message:
      'A veces los mejores regalos no se encuentran directamente. Hay que buscarlos, unir las piezas y dejarse sorprender por el camino.\n\nTu regalo de hoy es una contraseña: el último secreto que te queda por abrir. Guárdala bien, porque mañana la vas a necesitar.\n\n¡Feliz cumpleaños!',
  },
};
