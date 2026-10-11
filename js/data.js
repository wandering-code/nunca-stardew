// Datos de la guía (Stardew Valley 1.6). Estaciones: 0 primavera, 1 verano, 2 otoño, 3 invierno.
const SV = {};

SV.seasons = ['Primavera', 'Verano', 'Otoño', 'Invierno'];
SV.seasonIcons = ['flower', 'sun', 'leaf', 'snow'];

// n: nombre, s/d: cumpleaños, casa, pareja: se puede casar, ama: regalos que le encantan, facil: el más cómodo de conseguir
SV.npcs = [
  { n: 'Abigail', s: 2, d: 13, casa: 'Tienda de Pierre', pareja: true, ama: ['Amatista', 'Calabaza', 'Pastel de chocolate', 'Pez globo', 'Anguila picante', 'Tarta de moras', 'Pudding de plátano'], facil: 'Amatista (minas, pisos 1-39)' },
  { n: 'Alex', s: 1, d: 13, casa: 'Casa de George y Evelyn', pareja: true, ama: ['Desayuno inglés', 'Banquete de salmón'], facil: 'Desayuno inglés (receta de la tele, año 2); mientras, huevos, que le gustan' },
  { n: 'Elliott', s: 2, d: 5, casa: 'Cabaña de la playa', pareja: true, ama: ['Granada', 'Pluma de pato', 'Langosta', 'Tinta de calamar', 'Tortas de cangrejo', 'Sopa Tom Kha'], facil: 'Granada (árbol frutal) o pluma de pato' },
  { n: 'Emily', s: 0, d: 27, casa: 'Calle Sauce 2', pareja: true, ama: ['Amatista', 'Aguamarina', 'Esmeralda', 'Jade', 'Rubí', 'Topacio', 'Lana', 'Tela', 'Hamburguesa'], facil: 'Cualquier gema de las minas' },
  { n: 'Haley', s: 0, d: 14, casa: 'Calle Sauce 2', pareja: true, ama: ['Coco', 'Girasol', 'Macedonia', 'Pastel rosa'], facil: 'Girasol; le gusta el narciso (primavera)' },
  { n: 'Harvey', s: 3, d: 14, casa: 'Clínica', pareja: true, ama: ['Café', 'Encurtidos', 'Vino', 'Aceite de trufa', 'Supercomida'], facil: 'Café (300 o en el Salón)' },
  { n: 'Leah', s: 3, d: 23, casa: 'Cabaña del Bosque Tizón', pareja: true, ama: ['Ensalada', 'Queso de cabra', 'Vino', 'Trufa', 'Sofrito', 'Estofado vegetal', 'Muffin de amapola'], facil: 'Ensalada (220 o en el Salón)' },
  { n: 'Maru', s: 1, d: 10, casa: 'Carpintería (montaña)', pareja: true, ama: ['Pila', 'Coliflor', 'Fresa', 'Diamante', 'Lingote de oro', 'Lingote de iridio', 'Capricho de minero', 'Bocaditos de pimiento', 'Tarta de ruibarbo'], facil: 'Coliflor o fresa en primavera; lingote de oro después' },
  { n: 'Penny', s: 2, d: 2, casa: 'Caravana', pareja: true, ama: ['Cualquier libro', 'Amapola', 'Melón', 'Diamante', 'Esmeralda', 'Lenguado', 'Muffin de amapola', 'Plato rojo', 'Bandeja de raíces', 'Sopa Tom Kha'], facil: 'Melón o amapola en verano' },
  { n: 'Sam', s: 1, d: 17, casa: 'Calle Sauce 1', pareja: true, ama: ['Pizza', 'Higo chumbo', 'Bollito de arce', 'Ojo de tigre'], facil: 'Pizza (600 o en el Salón)' },
  { n: 'Sebastian', s: 3, d: 10, casa: 'Carpintería (sótano)', pareja: true, ama: ['Lágrima helada', 'Obsidiana', 'Sashimi', 'Sopa de calabaza', 'Huevo sombrío', 'Huevo de rana'], facil: 'Lágrima helada (minas, pisos 40-79)' },
  { n: 'Shane', s: 0, d: 20, casa: 'Rancho de Marnie', pareja: true, ama: ['Cerveza', 'Pizza', 'Chile', 'Bocaditos de pimiento'], facil: 'Cerveza (400 o en el Salón) o chile en verano' },
  { n: 'Caroline', s: 3, d: 7, casa: 'Tienda de Pierre', ama: ['Lentejuela de verano', 'Té verde', 'Taco de pescado', 'Curry tropical'], facil: 'Lentejuela de verano (flor)' },
  { n: 'Clint', s: 3, d: 26, casa: 'Herrería', ama: ['Amatista', 'Aguamarina', 'Esmeralda', 'Jade', 'Rubí', 'Topacio', 'Lingote de oro', 'Lingote de iridio', 'Omnigeoda', 'Salsa de alcachofa', 'Risotto de helecho'], facil: 'Gemas o lingote de oro' },
  { n: 'Demetrius', s: 1, d: 19, casa: 'Carpintería (montaña)', ama: ['Fresa', 'Helado', 'Arroz con leche', 'Estofado de judías'], facil: 'Helado (puesto de Alex en verano) o fresa' },
  { n: 'Enano', s: 1, d: 22, casa: 'Minas (tras la roca de la entrada)', ama: ['Amatista', 'Aguamarina', 'Esmeralda', 'Jade', 'Rubí', 'Topacio', 'Omnigeoda', 'Limonita', 'Anguila de lava'], facil: 'Gemas. Antes hay que donar los 4 pergaminos enanos al museo' },
  { n: 'Evelyn', s: 3, d: 20, casa: 'Calle del Río 1', ama: ['Tulipán', 'Remolacha', 'Rosa hada', 'Diamante', 'Pastel de chocolate', 'Relleno'], facil: 'Tulipán (primavera, 20 o la semilla)' },
  { n: 'George', s: 2, d: 24, casa: 'Calle del Río 1', ama: ['Puerro', 'Setas salteadas'], facil: 'Puerro (recolección de primavera): guarda varios' },
  { n: 'Gus', s: 1, d: 8, casa: 'Salón Fruta Estelar', ama: ['Diamante', 'Naranja', 'Taco de pescado', 'Escargot', 'Curry tropical'], facil: 'Naranja (árbol frutal) o diamante' },
  { n: 'Jas', s: 1, d: 4, casa: 'Rancho de Marnie', ama: ['Rosa hada', 'Pastel rosa', 'Pudin de ciruela', 'Caja de hadas', 'Muñeco antiguo'], facil: 'Rosa hada (otoño)' },
  { n: 'Jodi', s: 2, d: 11, casa: 'Calle Sauce 1', ama: ['Diamante', 'Pastel de chocolate', 'Lubina crujiente', 'Berenjena a la parmesana', 'Calamares fritos', 'Tortitas', 'Arroz con leche', 'Estofado vegetal'], facil: 'Diamante, o tortitas si tienes cocina' },
  { n: 'Kent', s: 0, d: 4, casa: 'Calle Sauce 1 (llega en el año 2)', ama: ['Risotto de helecho', 'Avellanas tostadas'], facil: 'Avellanas tostadas (3 avellanas, otoño)' },
  { n: 'Krobus', s: 3, d: 1, casa: 'Cloacas', ama: ['Diamante', 'Lingote de iridio', 'Calabaza', 'Huevo sombrío', 'Mayonesa sombría', 'Rábano silvestre'], facil: 'Rábano silvestre (recolección de primavera)' },
  { n: 'Leo', s: 1, d: 26, casa: 'Isla Jengibre', ama: ['Huevo de pato', 'Huevo de avestruz', 'Mango', 'Poi'], facil: 'Huevo de pato' },
  { n: 'Lewis', s: 0, d: 7, casa: 'Casa del alcalde', ama: ['Chile', 'Té verde', 'Botín otoñal', 'Ñames glaseados', 'Estofado vegetal'], facil: 'Chile (verano)' },
  { n: 'Linus', s: 3, d: 3, casa: 'Tienda de campaña (montaña)', ama: ['Ñame', 'Coco', 'Higo chumbo', 'Tarta de arándanos', 'Plato de alta mar'], facil: 'Ñame (otoño) o coco del desierto' },
  { n: 'Marnie', s: 2, d: 18, casa: 'Rancho de Marnie', ama: ['Diamante', 'Pastel rosa', 'Tarta de calabaza', 'Almuerzo de granjero'], facil: 'Diamante' },
  { n: 'Pam', s: 0, d: 18, casa: 'Caravana', ama: ['Chirivía', 'Cerveza', 'Cerveza clara', 'Hidromiel', 'Higo chumbo', 'Ñames glaseados', 'Sopa de chirivía', 'Piña colada'], facil: 'Chirivía: guarda un puñado de las primeras' },
  { n: 'Pierre', s: 0, d: 26, casa: 'Tienda de Pierre', ama: ['Calamares fritos'], facil: 'Le gustan casi todos los platos y los narcisos; amar, solo los calamares' },
  { n: 'Robin', s: 2, d: 21, casa: 'Carpintería (montaña)', ama: ['Queso de cabra', 'Melocotón', 'Espaguetis'], facil: 'Espaguetis (120 o en el Salón)' },
  { n: 'Sandy', s: 2, d: 15, casa: 'Oasis (desierto)', ama: ['Narciso', 'Azafrán', 'Guisante dulce', 'Arroz glutinoso con mango'], facil: 'Narciso (recolección de primavera)' },
  { n: 'Vincent', s: 0, d: 10, casa: 'Calle Sauce 1', ama: ['Uva', 'Caracol', 'Pastel rosa', 'Caramelo de arándano rojo', 'Ginger ale', 'Huevo de rana'], facil: 'Uva (recolección de verano)' },
  { n: 'Willy', s: 1, d: 24, casa: 'Tienda de pesca (playa)', ama: ['Pez gato', 'Esturión', 'Pulpo', 'Pepino de mar', 'Calabaza', 'Diamante', 'Lingote de iridio', 'Hidromiel'], facil: 'Calabaza u hidromiel' },
  { n: 'Mago (Rasmodius)', s: 3, d: 17, casa: 'Torre del Mago', ama: ['Seta lila', 'Esencia solar', 'Esencia sombría', 'Superpepino'], facil: 'Esencias de los monstruos de las minas' }
];

// Festivales y ventanas con fecha fija. t: f festival, w ventana de recolección
SV.events = [
  { s: 0, d: [13], t: 'f', n: 'Festival del huevo', h: '9:00-14:00 · Plaza' },
  { s: 0, d: [15, 16, 17], t: 'f', n: 'Festival del Desierto', h: 'Desde las 10:00 · Desierto (requiere autobús)' },
  { s: 0, d: [24], t: 'f', n: 'Danza floral', h: '9:00-14:00 · Bosque Tizón' },
  { s: 0, d: [15, 16, 17, 18], t: 'w', n: 'Bayas salmón', h: 'En los arbustos' },
  { s: 1, d: [11], t: 'f', n: 'Luau', h: '9:00-14:00 · Playa' },
  { s: 1, d: [12, 13, 14], t: 'w', n: 'Playa llena', h: 'Conchas y coral extra' },
  { s: 1, d: [20, 21], t: 'f', n: 'Derby de la Trucha', h: '6:10-2:00 · Río del bosque' },
  { s: 1, d: [28], t: 'f', n: 'Danza de las medusas lunares', h: '22:00-24:00 · Playa' },
  { s: 2, d: [8, 9, 10, 11], t: 'w', n: 'Moras', h: 'En los arbustos' },
  { s: 2, d: [16], t: 'f', n: 'Feria de Stardew Valley', h: '9:00-15:00 · Plaza' },
  { s: 2, d: [27], t: 'f', n: 'Víspera de los espíritus', h: '22:00-23:50 · Plaza' },
  { s: 3, d: [8], t: 'f', n: 'Festival del hielo', h: '9:00-14:00 · Bosque Tizón' },
  { s: 3, d: [12, 13], t: 'f', n: 'Festival del Calamar', h: '6:10-2:00 · Playa' },
  { s: 3, d: [15, 16, 17], t: 'f', n: 'Mercado nocturno', h: '17:00-2:00 · Playa' },
  { s: 3, d: [25], t: 'f', n: 'Fiesta de la estrella de invierno', h: '9:00-14:00 · Plaza' }
];

// Lotes estándar del Centro Cívico. Objeto: [nombre, pista]
SV.rooms = [
  { n: 'Sala de manualidades', premio: 'Puente a la Cantera reparado', lotes: [
    { n: 'Recolección primaveral', need: 4, premio: '30 semillas primaverales', items: [['Rábano silvestre', 'Recolección · primavera'], ['Narciso', 'Recolección · primavera'], ['Puerro', 'Recolección · primavera'], ['Diente de león', 'Recolección · primavera']] },
    { n: 'Recolección veraniega', need: 3, premio: '30 semillas veraniegas', items: [['Uva', 'Recolección · verano'], ['Baya especiada', 'Recolección · verano'], ['Guisante dulce', 'Recolección · verano']] },
    { n: 'Recolección otoñal', need: 4, premio: '30 semillas otoñales', items: [['Seta común', 'Recolección · otoño'], ['Ciruela salvaje', 'Recolección · otoño'], ['Avellana', 'Recolección · otoño'], ['Mora', 'Recolección · otoño (arbustos 8-11)']] },
    { n: 'Recolección invernal', need: 4, premio: '30 semillas invernales', items: [['Raíz invernal', 'Azada en tierra o gusanos · invierno'], ['Fruta de cristal', 'Recolección · invierno'], ['Ñame nival', 'Azada en tierra o gusanos · invierno'], ['Azafrán', 'Recolección · invierno']] },
    { n: 'Construcción', need: 4, premio: 'Horno de carbón', items: [['99 de madera', ''], ['99 de madera (otra vez)', ''], ['99 de piedra', ''], ['10 de madera noble', 'Tocones grandes: hacha de cobre o mejor']] },
    { n: 'Recolección exótica', need: 5, premio: '5 Botín otoñal', items: [['Coco', 'Desierto'], ['Higo chumbo', 'Desierto'], ['Zanahoria cavernaria', 'Minas: cajas y azada'], ['Seta roja', 'Minas, cueva de setas, Bosque Secreto'], ['Seta lila', 'Minas (81+), cueva de setas'], ['Jarabe de arce', 'Grifo en un arce'], ['Resina de roble', 'Grifo en un roble'], ['Brea de pino', 'Grifo en un pino'], ['Colmenilla', 'Bosque Secreto en primavera, cueva de setas']] }
  ] },
  { n: 'Alacena', premio: 'Invernadero reparado', lotes: [
    { n: 'Cultivos de primavera', need: 4, premio: '20 Acelerador básico', items: [['Chirivía', ''], ['Judía verde', ''], ['Coliflor', ''], ['Patata', '']] },
    { n: 'Cultivos de verano', need: 4, premio: 'Aspersor de calidad', items: [['Tomate', ''], ['Chile', ''], ['Arándano', ''], ['Melón', '']] },
    { n: 'Cultivos de otoño', need: 4, premio: 'Colmena', items: [['Maíz', 'También crece en verano'], ['Berenjena', ''], ['Calabaza', ''], ['Ñame', '']] },
    { n: 'Cultivos de calidad', need: 3, premio: 'Envasadora', items: [['5 chirivías de oro', 'Primavera · usa fertilizante'], ['5 melones de oro', 'Verano'], ['5 calabazas de oro', 'Otoño'], ['5 maíces de oro', 'Verano y otoño']] },
    { n: 'Origen animal', need: 5, premio: 'Prensa de queso', items: [['Leche XXL', 'Vaca con buena amistad'], ['Huevo XXL marrón', 'Gallina marrón'], ['Huevo XXL', 'Gallina blanca'], ['Leche de cabra XXL', 'Cabra (establo grande)'], ['Lana', 'Oveja o conejo'], ['Huevo de pato', 'Pato (gallinero grande)']] },
    { n: 'Origen artesanal', need: 6, premio: 'Barril', items: [['Aceite de trufa', 'Trufa + aceitera'], ['Tela', 'Lana + telar'], ['Queso de cabra', ''], ['Queso', ''], ['Miel', 'Colmena'], ['Mermelada', 'Fruta + envasadora'], ['Manzana', 'Árbol · otoño'], ['Albaricoque', 'Árbol · primavera'], ['Naranja', 'Árbol · verano'], ['Melocotón', 'Árbol · verano'], ['Granada', 'Árbol · otoño'], ['Cereza', 'Árbol · primavera']] }
  ] },
  { n: 'Pecera', premio: 'Peñasco de la montaña retirado (batea de cobre)', lotes: [
    { n: 'Peces fluviales', need: 4, premio: '30 Cebo de lujo', items: [['Pez sol', 'Río · primavera y verano · 6-19 h · sol'], ['Pez gato', 'Río · primavera y otoño · lluvia · 6-24 h'], ['Sábalo', 'Río · primavera a otoño · lluvia · 9-2 h'], ['Trucha tigre', 'Río · otoño e invierno · 6-19 h']] },
    { n: 'Peces de lago', need: 4, premio: 'Girador disfrazado', items: [['Perca', 'Lago de la montaña · todo el año · 6-19 h'], ['Carpa', 'Lago de la montaña · primavera a otoño'], ['Siluro', 'Lago de la montaña · todo el año'], ['Esturión', 'Lago de la montaña · verano e invierno · 6-19 h']] },
    { n: 'Peces marinos', need: 4, premio: '5 Tótem de viaje: Playa', items: [['Sardina', 'Mar · primavera, otoño e invierno · 6-19 h'], ['Atún', 'Mar · verano e invierno · 6-19 h'], ['Pargo colorado', 'Mar · verano y otoño · lluvia · 6-19 h'], ['Tilapia', 'Mar · verano y otoño · 6-14 h']] },
    { n: 'Peces nocturnos', need: 3, premio: 'Anillo brillante', items: [['Lucio', 'Río y lagos · otoño · lluvia · 12-2 h'], ['Besugo', 'Río · todo el año · 18-2 h'], ['Anguila', 'Mar · primavera y otoño · lluvia · 16-2 h']] },
    { n: 'Trampa para cangrejos', need: 5, premio: '3 Trampas para cangrejos', items: [['Langosta', 'Trampa en el mar'], ['Cangrejo de río', 'Trampa en agua dulce'], ['Cangrejo', 'Trampa en el mar'], ['Berberecho', 'Trampa en el mar o playa'], ['Mejillón', 'Trampa en el mar o playa'], ['Gamba', 'Trampa en el mar'], ['Caracol', 'Trampa en agua dulce'], ['Bígaro', 'Trampa en agua dulce'], ['Ostra', 'Trampa en el mar o playa'], ['Almeja', 'Trampa en el mar o playa']] },
    { n: 'Peces especiales', need: 4, premio: '5 Plato de alta mar', items: [['Pez globo', 'Mar · verano · sol · 12-16 h'], ['Pez fantasma', 'Minas, pisos 20 y 60 (o lo sueltan los fantasmas)'], ['Lenguado', 'Estanque del desierto · 6-20 h'], ['Muyu', 'Estanque del Bosque Secreto']] }
  ] },
  { n: 'Sala de caldera', premio: 'Vagonetas reparadas', lotes: [
    { n: 'Herrero', need: 3, premio: 'Horno', items: [['Lingote de cobre', ''], ['Lingote de hierro', ''], ['Lingote de oro', '']] },
    { n: 'Geólogo', need: 4, premio: '5 Omnigeodas', items: [['Cuarzo', 'Minas, cualquier piso'], ['Cristal terrestre', 'Minas, pisos 1-39'], ['Lágrima helada', 'Minas, pisos 40-79'], ['Cuarzo de fuego', 'Minas, pisos 80-120']] },
    { n: 'Aventurero', need: 2, premio: 'Pequeño anillo magnético', items: [['99 de baba', 'Slimes'], ['10 alas de murciélago', 'Murciélagos (pisos 31-39 y helados)'], ['Esencia solar', 'Fantasmas (pisos 51-79) y monstruos de los pisos 80+'], ['Esencia sombría', 'Brutos y espíritus sombríos (80+)']] }
  ] },
  { n: 'Tablón de anuncios', premio: 'Dos corazones de amistad con los aldeanos no casables', lotes: [
    { n: 'Chef', need: 6, premio: '3 Pastel rosa', items: [['Jarabe de arce', 'Grifo en un arce'], ['Helecho', 'Bosque Secreto · verano'], ['Trufa', 'Cerdos (establo deluxe); no en invierno'], ['Amapola', 'Cultivo de verano'], ['Rollitos maki', 'Receta: tele (21 de verano, año 1) o el Salón'], ['Huevo frito', 'Cocina: 1 huevo']] },
    { n: 'Tinte', need: 6, premio: 'Semilladora', items: [['Seta roja', 'Minas, cueva de setas, Bosque Secreto'], ['Erizo de mar', 'Charcas al este de la playa (300 de madera para el puente)'], ['Girasol', 'Cultivo de verano y otoño'], ['Pluma de pato', 'Patos con buena amistad'], ['Aguamarina', 'Minas, pisos 40+'], ['Lombarda', 'Semillas en Pierre desde el año 2, o Carro Ambulante']] },
    { n: 'Estudio de campo', need: 4, premio: 'Máquina recicladora', items: [['Seta lila', 'Minas (81+), cueva de setas'], ['Concha de nautilo', 'Playa · solo en invierno'], ['Barbo', 'Lago de la montaña y río del bosque · todo el año'], ['Geoda de hielo', 'Minas, pisos 40-79']] },
    { n: 'Pienso', need: 3, premio: 'Radiador', items: [['10 de trigo', 'Cultivo de verano y otoño'], ['10 de heno', 'Marnie o tu silo'], ['3 manzanas', 'Manzano · otoño']] },
    { n: 'Encantador', need: 4, premio: '5 Lingotes de oro', items: [['Resina de roble', 'Grifo en un roble'], ['Vino', 'Fruta + barril'], ['Pata de conejo', 'Conejos con buena amistad, o Carro Ambulante'], ['Granada', 'Granado · otoño']] }
  ] },
  { n: 'Caja fuerte', premio: 'Autobús al desierto reparado', lotes: [
    { n: '2 500 o', need: 1, premio: '3 Pastel de chocolate', items: [['Pagar 2 500 o', '']] },
    { n: '5 000 o', need: 1, premio: '30 Fertilizante de calidad', items: [['Pagar 5 000 o', '']] },
    { n: '10 000 o', need: 1, premio: 'Pararrayos', items: [['Pagar 10 000 o', '']] },
    { n: '25 000 o', need: 1, premio: 'Cristalario', items: [['Pagar 25 000 o', '']] }
  ] }
];

// Cultivos: n, s estaciones, sem precio semilla, donde, dias, reb días de rebrote (0 = no), venta, nota
SV.crops = [
  { n: 'Chirivía', s: [0], sem: 20, donde: 'Pierre', dias: 4, reb: 0, venta: 35, nota: 'Lote de primavera y 5 de oro para el de calidad' },
  { n: 'Patata', s: [0], sem: 50, donde: 'Pierre', dias: 6, reb: 0, venta: 80, nota: 'Mejor dinero rápido de la primera semana; a veces da patatas extra' },
  { n: 'Col rizada', s: [0], sem: 70, donde: 'Pierre', dias: 6, reb: 0, venta: 110, nota: '' },
  { n: 'Coliflor', s: [0], sem: 80, donde: 'Pierre', dias: 12, reb: 0, venta: 175, nota: 'Lote. Puede hacerse gigante en bloques de 3×3' },
  { n: 'Judía verde', s: [0], sem: 60, donde: 'Pierre', dias: 10, reb: 3, venta: 40, nota: 'Lote. Espaldera: no se puede atravesar' },
  { n: 'Fresa', s: [0], sem: 100, donde: 'Festival del huevo (día 13)', dias: 8, reb: 4, venta: 120, nota: 'El mejor de primavera: guarda semillas para el día 1 del año 2' },
  { n: 'Ajo', s: [0], sem: 40, donde: 'Pierre (año 2)', dias: 4, reb: 0, venta: 60, nota: '' },
  { n: 'Ruibarbo', s: [0], sem: 100, donde: 'Oasis', dias: 13, reb: 0, venta: 220, nota: 'Requiere el autobús' },
  { n: 'Zanahoria', s: [0], sem: 0, donde: 'Puntos de semillas, cajas misteriosas', dias: 3, reb: 0, venta: 35, nota: 'Nuevo en 1.6; no se vende en tiendas' },
  { n: 'Tulipán', s: [0], sem: 20, donde: 'Pierre', dias: 6, reb: 0, venta: 30, nota: 'Regalo para Evelyn' },
  { n: 'Grano de café', s: [0, 1], sem: 2500, donde: 'Carro Ambulante', dias: 10, reb: 2, venta: 15, nota: 'Se multiplica solo: planta los granos. 5 granos = 1 café en barril' },
  { n: 'Arándano', s: [1], sem: 80, donde: 'Pierre', dias: 13, reb: 4, venta: 50, nota: 'Da 3 por cosecha. El más rentable del verano en Pierre. Lote' },
  { n: 'Melón', s: [1], sem: 80, donde: 'Pierre', dias: 12, reb: 0, venta: 250, nota: 'Lote y 5 de oro. Puede hacerse gigante' },
  { n: 'Tomate', s: [1], sem: 50, donde: 'Pierre', dias: 11, reb: 4, venta: 60, nota: 'Lote' },
  { n: 'Chile', s: [1], sem: 40, donde: 'Pierre', dias: 5, reb: 3, venta: 40, nota: 'Lote. Regalo para Shane y Lewis' },
  { n: 'Lúpulo', s: [1], sem: 60, donde: 'Pierre', dias: 11, reb: 1, venta: 25, nota: 'Espaldera. Solo compensa con barriles: cerveza clara a 300 o' },
  { n: 'Rábano', s: [1], sem: 40, donde: 'Pierre', dias: 6, reb: 0, venta: 90, nota: '' },
  { n: 'Lombarda', s: [1], sem: 100, donde: 'Pierre (año 2)', dias: 9, reb: 0, venta: 260, nota: 'Lote del tinte: lo que más retrasa el Centro Cívico' },
  { n: 'Carambola', s: [1], sem: 400, donde: 'Oasis', dias: 13, reb: 0, venta: 750, nota: 'Requiere el autobús. En barril, 2 250 o' },
  { n: 'Amapola', s: [1], sem: 100, donde: 'Pierre', dias: 7, reb: 0, venta: 140, nota: 'Lote del chef. Regalo para Penny' },
  { n: 'Lentejuela de verano', s: [1], sem: 50, donde: 'Pierre', dias: 8, reb: 0, venta: 90, nota: 'Regalo para Caroline' },
  { n: 'Calabacín de verano', s: [1], sem: 0, donde: 'Puntos de semillas, cajas misteriosas', dias: 6, reb: 3, venta: 45, nota: 'Nuevo en 1.6' },
  { n: 'Maíz', s: [1, 2], sem: 150, donde: 'Pierre', dias: 14, reb: 4, venta: 50, nota: 'Aguanta el cambio de verano a otoño. Lote' },
  { n: 'Trigo', s: [1, 2], sem: 10, donde: 'Pierre', dias: 4, reb: 0, venta: 25, nota: '10 para el lote del pienso; también da heno' },
  { n: 'Girasol', s: [1, 2], sem: 200, donde: 'Pierre', dias: 8, reb: 0, venta: 80, nota: 'Lote del tinte. Más barato en MercaJoja (125 o)' },
  { n: 'Arándano rojo', s: [2], sem: 240, donde: 'Pierre', dias: 7, reb: 5, venta: 75, nota: 'Da 2 por cosecha. Muy rentable si se planta el día 1' },
  { n: 'Calabaza', s: [2], sem: 100, donde: 'Pierre', dias: 13, reb: 0, venta: 320, nota: 'Lote y 5 de oro. Puede hacerse gigante' },
  { n: 'Ñame', s: [2], sem: 60, donde: 'Pierre', dias: 10, reb: 0, venta: 160, nota: 'Lote' },
  { n: 'Berenjena', s: [2], sem: 20, donde: 'Pierre', dias: 5, reb: 5, venta: 60, nota: 'Lote' },
  { n: 'Uva', s: [2], sem: 60, donde: 'Pierre', dias: 10, reb: 3, venta: 80, nota: 'Espaldera' },
  { n: 'Amaranto', s: [2], sem: 70, donde: 'Pierre', dias: 7, reb: 0, venta: 150, nota: 'Se cosecha con guadaña' },
  { n: 'Bok choy', s: [2], sem: 50, donde: 'Pierre', dias: 4, reb: 0, venta: 80, nota: '' },
  { n: 'Alcachofa', s: [2], sem: 30, donde: 'Pierre (año 2)', dias: 8, reb: 0, venta: 160, nota: '' },
  { n: 'Remolacha', s: [2], sem: 20, donde: 'Oasis', dias: 6, reb: 0, venta: 100, nota: 'Requiere el autobús' },
  { n: 'Rosa hada', s: [2], sem: 200, donde: 'Pierre', dias: 12, reb: 0, venta: 290, nota: 'Junto a colmenas da la miel más cara. Regalo para Jas y Evelyn' },
  { n: 'Brócoli', s: [2], sem: 0, donde: 'Puntos de semillas, cajas misteriosas', dias: 8, reb: 4, venta: 70, nota: 'Nuevo en 1.6' },
  { n: 'Baya dulce gema', s: [2], sem: 1000, donde: 'Carro Ambulante (semilla rara)', dias: 24, reb: 0, venta: 3000, nota: 'Plántala antes del día 4. La primera, para la estatua del Bosque Secreto' },
  { n: 'Melón de polvo', s: [3], sem: 0, donde: 'Puntos de semillas, cajas misteriosas', dias: 7, reb: 0, venta: 60, nota: 'Nuevo en 1.6: el único cultivo normal de invierno' },
  { n: 'Fruta milenaria', s: [0, 1, 2], sem: 0, donde: 'Semilla milenaria (museo) y semilladora', dias: 28, reb: 7, venta: 550, nota: 'El cultivo estrella del invernadero. En barril, 1 650 o' }
];

// Peces legendarios
SV.legendary = [
  ['Carmesí (Crimsonfish)', 'Verano', 'Muelle del extremo este de la playa', '5'],
  ['Rape (Angler)', 'Otoño', 'Puente de madera al norte del pueblo, junto a MercaJoja', '3'],
  ['Glaciar (Glacierfish)', 'Invierno', 'Punta sur de la isla del río, en el Bosque Tizón', '6'],
  ['Leyenda (Legend)', 'Primavera, con lluvia', 'Lago de la montaña, junto al tronco sumergido', '10'],
  ['Carpa mutante', 'Todo el año', 'Cloacas', '—']
];
