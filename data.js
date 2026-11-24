// CONFIG — P&P Inoxidables (demo Vigolo Web Studio)
// Todo lo que cambia de un comercio a otro vive acá.
// NOTA al clonar para otro comercio: además de este archivo, actualizar <head> de index.html
// (title, description, og:*, JSON-LD) porque los buscadores y WhatsApp leen eso sin ejecutar JS.

const CONFIG = {
  negocio: {
    nombre: "P&P Inoxidables",
    rubro: "Fabricación en acero inoxidable",
    localidad: "Zona Sur, Buenos Aires", // PENDIENTE CLIENTE: confirmar localidad (Google Maps dice Tigre, CP B1841)
    eslogan: "Acero inoxidable a medida para cocinas profesionales",
    logo: "img/logo.webp",
  },

  contacto: {
    whatsapp: "5491130869471",
    mensajeWhatsapp: "¡Hola! Vi su web y quería consultar por un trabajo en acero inoxidable.",
    telefono: "+54 9 11 3086-9471",
    telefonoLink: "+5491130869471",
    instagram: "https://www.instagram.com/pyp_inoxidables/",
    instagramUser: "@pyp_inoxidables",
    instagramSeguidores: "10.485",
    tiktok: "https://www.tiktok.com/@pyp2784",
    facebook: "", // PENDIENTE CLIENTE: link de la página "PyP Inoxidables"
    direccion: "Av. Ángel Torcuato de Alvear 2784, B1841, Buenos Aires",
    mapsEmbed: "https://www.google.com/maps?q=Avenida+%C3%81ngel+Torcuato+de+Alvear+2784,+B1841+Buenos+Aires,+Argentina&output=embed",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Avenida+%C3%81ngel+Torcuato+de+Alvear+2784,+B1841+Buenos+Aires,+Argentina",
  },

  // 0 = domingo ... 6 = sábado
  horarios: {
    0: [],
    1: [],
    2: [["09:00", "17:00"]],
    3: [["09:00", "17:00"]],
    4: [["09:00", "17:00"]],
    5: [["09:00", "17:00"]],
    6: [["09:00", "13:00"]],
  },
  horariosTexto: [
    ["Martes a viernes", "9:00 a 17:00"],
    ["Sábados", "9:00 a 13:00"],
    ["Domingos y lunes", "Cerrado"],
  ],

  // Argumentos reales tomados de la gráfica "¿Por qué nuestras mesas son las mejores del mercado?"
  ventajas: [
    { big: "12", sub: "línea pesada", titulo: "Acero 12 línea pesada", texto: "La resistencia que necesitás para trabajar todos los días.", icono: "acero" },
    { big: "0", sub: "madera", titulo: "Sin madera", texto: "Refuerzos de acero: nada se pudre ni se hincha.", icono: "madera" },
    { big: "40×40", sub: "mm de caño", titulo: "Patas de caño cuadrado", texto: "Estabilidad absoluta, sin tambaleos.", icono: "patas" },
    { big: "+300", sub: "kg de carga", titulo: "Aguantan el trabajo pesado", texto: "Ideales para amasar, depositar y trabajar sin problemas.", icono: "peso" },
    { big: "100%", sub: "higiénicas", titulo: "Fáciles de limpiar", texto: "Perfectas para uso profesional e industrial.", icono: "higiene" },
    { big: "A", sub: "tu medida", titulo: "Todo a medida", texto: "Mesas, topineras, bachas y campanas para tu cocina.", icono: "medida" },
  ],

  pasos: [
    { titulo: "Contanos qué necesitás", texto: "Escribinos por WhatsApp con una foto o las medidas del espacio. Si no las tenés, te orientamos." },
    { titulo: "Te pasamos el presupuesto", texto: "Sin cargo y sin compromiso. Definimos medidas, terminaciones y plazo." },
    { titulo: "Fabricamos y entregamos", texto: "Lo hacemos en nuestro taller y te lo llevamos listo para usar." },
  ],

  categorias: [
    "Mesas y mesadas",
    "Topineras y pasaplatos",
    "Bachas y piletas",
    "Estanterías y carros",
    "Campanas y alacenas",
    "Otros productos",
  ],

  // Sin precios: son productos a medida, el objetivo es pedir presupuesto.
  productos: [
    // Mesas y mesadas
    { id: "mesada-dos-estantes", cat: "Mesas y mesadas", nombre: "Mesada con 2 estantes inferiores", desc: "Mesada en acero inoxidable con dos estantes para guardar debajo.", foto: "img/p-mesada-dos-estantes.webp", destacado: true },
    { id: "mesada-un-estante", cat: "Mesas y mesadas", nombre: "Mesada con un estante inferior", desc: "El clásico de cocina: tapa lisa y un estante de apoyo.", foto: "img/p-mesada-un-estante.webp" },
    { id: "mesada-sin-estantes", cat: "Mesas y mesadas", nombre: "Mesada sin estantes", desc: "Mesa de trabajo despejada, ideal para pasar equipos por debajo.", foto: "img/p-mesada-sin-estantes.webp" },
    { id: "mesas-guias", cat: "Mesas y mesadas", nombre: "Mesas con guías", desc: "Con guías laterales para bandejas y placas.", foto: "img/p-mesas-guias.webp" },
    { id: "mesitas-apoyo", cat: "Mesas y mesadas", nombre: "Mesitas de apoyo", desc: "Chicas, con ruedas y estante, para tener todo a mano.", foto: "img/p-mesitas-apoyo.webp" },
    { id: "mesas-ratonas", cat: "Mesas y mesadas", nombre: "Mesas ratonas a medida", desc: "Mesas bajas hechas con las medidas que necesites.", foto: "img/p-mesas-ratonas.webp" },
    { id: "mesa-cajones", cat: "Mesas y mesadas", nombre: "Mesa con cajones", desc: "Mesa de trabajo con cajones para utensilios y herramientas.", foto: "img/p-mesa-cajones.webp" },
    { id: "mesa-triple-latero", cat: "Mesas y mesadas", nombre: "Mesa triple latero", desc: "Mesa con tres compartimentos para latas y bandejas.", foto: "img/p-mesa-triple-latero.webp" },
    { id: "mesa-cerrada-puertas", cat: "Mesas y mesadas", nombre: "Mesa cerrada con puertas", desc: "Guarda todo adentro, con puertas corredizas.", foto: "img/p-mesa-cerrada-puertas.webp" },
    { id: "mesas-mostrador", cat: "Mesas y mesadas", nombre: "Mesas tipo mostrador", desc: "Para atención al público, con espacio de guardado.", foto: "img/p-mesas-mostrador.webp" },
    { id: "mesa-desarmable", cat: "Mesas y mesadas", nombre: "Mesa desarmable 100% acero", desc: "Se arma y desarma fácil, ideal para transportar.", foto: "img/p-mesa-desarmable.webp" },
    { id: "mesas-traslado", cat: "Mesas y mesadas", nombre: "Mesas de traslado", desc: "Con ruedas, para mover mercadería sin esfuerzo.", foto: "img/p-mesas-traslado.webp" },

    // Topineras y pasaplatos
    { id: "mesas-topinera", cat: "Topineras y pasaplatos", nombre: "Mesas con topinera a medida", desc: "Mesa de trabajo con topinera para cubetas GN, hecha a tu medida.", foto: "img/p-mesas-topinera.webp", destacado: true },
    { id: "topineras-medida", cat: "Topineras y pasaplatos", nombre: "Topineras a medida", desc: "Para hamburgueserías, pizzerías, sandwicherías y cocinas de línea.", foto: "img/p-topineras-medida.webp" },
    { id: "topineras-apoyo", cat: "Topineras y pasaplatos", nombre: "Topineras de apoyo", desc: "Topineras para apoyar sobre cualquier mesada.", foto: "img/p-topineras-apoyo.webp" },
    { id: "pasaplatos-medida", cat: "Topineras y pasaplatos", nombre: "Pasaplatos a medida", desc: "Estante superior para pasar platos entre cocina y salón.", foto: "img/p-pasaplatos-medida.webp" },
    { id: "mesada-pasaplatos", cat: "Topineras y pasaplatos", nombre: "Mesada con pasaplatos", desc: "Mesada con estante superior incorporado.", foto: "img/p-mesada-pasaplatos.webp" },
    { id: "mesa-trabajo-pasaplatos", cat: "Topineras y pasaplatos", nombre: "Mesa de trabajo personalizada con pasaplatos", desc: "Diseñada según tu flujo de trabajo en la cocina.", foto: "img/p-mesa-trabajo-pasaplatos.webp" },

    // Bachas y piletas
    { id: "mesadas-bacha", cat: "Bachas y piletas", nombre: "Mesadas con bacha", desc: "Mesada con pileta integrada y estante inferior.", foto: "img/p-mesadas-bacha.webp", destacado: true },
    { id: "mesada-bacha-pasaplatos", cat: "Bachas y piletas", nombre: "Mesada con bacha y pasaplatos", desc: "Lavado y pase de platos en un solo mueble.", foto: "img/p-mesada-bacha-pasaplatos.webp" },
    { id: "mesas-bacha-doble", cat: "Bachas y piletas", nombre: "Mesas con bacha doble", desc: "Dos piletas para separar lavado y enjuague.", foto: "img/p-mesas-bacha-doble.webp" },
    { id: "bacha-rodilla", cat: "Bachas y piletas", nombre: "Bacha con accionador de rodilla", desc: "Abrís el agua con la rodilla y mantenés las manos limpias.", foto: "img/p-bacha-rodilla.webp" },
    { id: "bachon-doble-escurridor", cat: "Bachas y piletas", nombre: "Bachón con patas y doble escurridor", desc: "Bachón profundo con escurridores a ambos lados.", foto: "img/p-bachon-doble-escurridor.webp" },
    { id: "bachones-produccion", cat: "Bachas y piletas", nombre: "Bachones de producción", desc: "Fabricación en serie de bachones para cocinas industriales.", foto: "img/p-bachones-produccion.webp" },

    // Estanterías y carros
    { id: "estanterias-cano", cat: "Estanterías y carros", nombre: "Estanterías de caño de acero inoxidable", desc: "Estantes de caño: ventilan, escurren y aguantan peso.", foto: "img/p-estanterias-cano.webp", destacado: true },
    { id: "estanteria-escurridora", cat: "Estanterías y carros", nombre: "Estantería escurridora", desc: "Estantes calados para que escurra todo lo recién lavado.", foto: "img/p-estanteria-escurridora.webp" },
    { id: "estanteria-cerrada", cat: "Estanterías y carros", nombre: "Estantería cerrada con ruedas", desc: "Cerrada en los laterales y con ruedas para moverla.", foto: "img/p-estanteria-cerrada.webp" },
    { id: "rack", cat: "Estanterías y carros", nombre: "Rack 2,00 × 0,60 × 2,00", desc: "Rack de carga para depósito y cámara.", foto: "img/p-rack-2x060x2.webp" },
    { id: "carro-cajones", cat: "Estanterías y carros", nombre: "Carro para cajones", desc: "Carro con guías para transportar cajones.", foto: "img/p-carro-cajones.webp" },
    { id: "carros-porta-gn", cat: "Estanterías y carros", nombre: "Carros porta GN con o sin puertas", desc: "Para cubetas GN, con puertas o abiertos.", foto: "img/p-carros-porta-gn.webp" },
    { id: "carros-cerrados-gn", cat: "Estanterías y carros", nombre: "Carros cerrados y porta GN", desc: "Cerrados, con guías para bandejas y cubetas.", foto: "img/p-carros-cerrados-gn.webp" },
    { id: "canastos-apilables", cat: "Estanterías y carros", nombre: "Canastos apilables de acero inoxidable", desc: "Calados y apilables, para lavar y almacenar.", foto: "img/p-canastos-apilables.webp" },

    // Campanas y alacenas
    { id: "campanas", cat: "Campanas y alacenas", nombre: "Campanas de acero inoxidable", desc: "Fabricación de campanas para cocinas, a la medida del lugar.", foto: "img/p-campana.webp", destacado: true },
    { id: "alacenas", cat: "Campanas y alacenas", nombre: "Alacenas con puertas corredizas", desc: "Alacenas colgantes de acero, con puertas corredizas.", foto: "img/p-alacenas.webp" },

    // Otros productos
    { id: "escaleras", cat: "Otros productos", nombre: "Escaleras en acero a medida", desc: "Escaleras de acero para acceder a depósitos y altillos.", foto: "img/p-escaleras-acero.webp" },
    { id: "palas-basura", cat: "Otros productos", nombre: "Palas de basura en acero", desc: "Palas robustas para sector de residuos.", foto: "img/p-palas-basura-acero.webp" },
    { id: "porta-tachos", cat: "Otros productos", nombre: "Porta tachos de basura", desc: "Mueble para esconder y ordenar los tachos.", foto: "img/p-porta-tachos.webp" },
    { id: "cortantes", cat: "Otros productos", nombre: "Cortantes a medida", desc: "Cortantes de acero con la forma y medida que necesites.", foto: "img/p-cortantes-medida.webp" },
    { id: "productos-pedido", cat: "Otros productos", nombre: "Productos a pedido", desc: "Si lo podés imaginar en acero, lo podemos fabricar.", foto: "img/p-productos-pedido.webp" },
    { id: "mostrador-vitrina", cat: "Otros productos", nombre: "Mostrador vitrina línea Teora", desc: "Mostradores vitrina de la línea Teora (refrigeración).", foto: "img/p-mostrador-vitrina.webp" },
    { id: "llaveros", cat: "Otros productos", nombre: "Llaveros y porta celulares con tu marca", desc: "Ideales para regalar a tus clientes, con tu logo grabado.", foto: "img/p-llaveros-marca.webp" },
  ],

  // Fotos reales de trabajos (w/h para evitar saltos de layout)
  trabajos: [
    { foto: "img/mesadas-linea.webp", w: 1125, h: 844, alt: "Línea de mesadas de acero inoxidable con topineras instaladas en una cocina profesional" },
    { foto: "img/cocina-pasaplatos.webp", w: 1000, h: 1778, alt: "Mesada de acero inoxidable con pasaplatos y topinera en una cocina" },
    { foto: "img/campana.webp", w: 906, h: 1226, alt: "Campana de acero inoxidable instalada sobre pared blanca" },
    { foto: "img/topinera-larga.webp", w: 1125, h: 632, alt: "Mesada con topinera larga de cubetas GN y estante superior" },
    { foto: "img/mesas-acero.webp", w: 986, h: 1160, alt: "Mesas de acero inoxidable con estantes inferiores y calentador" },
    { foto: "img/mesada-bacha-estantes.webp", w: 1125, h: 632, alt: "Rincón de cocina con mesada en L, bacha y estantes de acero inoxidable" },
    { foto: "img/bacha-pie.webp", w: 898, h: 1220, alt: "Bacha de acero inoxidable con patas y refuerzos" },
    { foto: "img/estanteria-cerrada.webp", w: 760, h: 1610, alt: "Estantería cerrada de acero inoxidable con ruedas" },
  ],

  faq: [
    { p: "¿Hacen trabajos a medida?", r: "Sí, es lo que más hacemos. Mesadas, bachas, topineras, campanas y estanterías con las medidas exactas de tu cocina." },
    { p: "¿Cómo pido un presupuesto?", r: "Escribinos por WhatsApp con una foto o las medidas del lugar y qué querés fabricar. Te respondemos con el presupuesto sin cargo." },
    { p: "¿Qué tipo de acero usan?", r: "Trabajamos con acero inoxidable de 12 línea pesada, con patas de caño cuadrado de 40×40 mm y refuerzos de acero (sin madera)." },
    { p: "¿Cuánto peso soportan las mesas?", r: "Nuestras mesas soportan más de 300 kg, pensadas para amasar, depositar y hacer trabajos pesados." },
    { p: "¿Hacen entregas e instalación?", r: "Consultanos según tu zona y el tipo de trabajo. // PENDIENTE CLIENTE: confirmar zona de entrega e instalación." },
    { p: "¿Puedo pasar a ver los productos?", r: "Claro, tenemos local a la calle. Te esperamos de martes a viernes de 9 a 17 y los sábados de 9 a 13." },
  ],

  seo: {
    titulo: "Muebles de acero inoxidable a medida | P&P Inoxidables",
    descripcion: "Fabricamos mesadas, bachas, topineras, campanas y estanterías en acero inoxidable a medida para cocinas profesionales. Pedí tu presupuesto por WhatsApp.",
    ogImage: "img/og.jpg", // 1200x630, local
    tipoSchema: "LocalBusiness",
  },
};
