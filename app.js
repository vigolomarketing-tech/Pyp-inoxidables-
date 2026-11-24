(() => {
  const C = CONFIG, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const wa = (t) => `https://wa.me/${C.contacto.whatsapp}?text=${encodeURIComponent(t)}`;
  const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const el = (tag, attrs = {}, html = "") => { const e = document.createElement(tag); Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v)); e.innerHTML = html; return e; };

  // ---- Textos y enlaces desde CONFIG
  $$("[data-localidad]").forEach((n) => (n.textContent = C.negocio.localidad));
  $$("[data-direccion]").forEach((n) => (n.textContent = C.contacto.direccion));
  $$("[data-total]").forEach((n) => (n.textContent = C.productos.length));
  $$("[data-ig-seg]").forEach((n) => (n.textContent = "+" + C.contacto.instagramSeguidores.split(".")[0] + " mil"));
  $$("[data-tel]").forEach((n) => { n.textContent = C.contacto.telefono; n.href = "tel:" + C.contacto.telefonoLink; });
  $$("[data-wa]").forEach((a) => { a.href = wa(a.dataset.wa); a.target = "_blank"; a.rel = "noopener"; });
  $("#wa-float").href = wa(C.contacto.mensajeWhatsapp);
  $("#wa-float").target = "_blank"; $("#wa-float").rel = "noopener";
  $("#ig-link").href = $("#ig").href = C.contacto.instagram;
  $("#ig").textContent = "Instagram " + C.contacto.instagramUser;
  $("#tk").href = C.contacto.tiktok;
  $("#como-llegar").href = C.contacto.mapsLink;
  $("#map").src = C.contacto.mapsEmbed;
  $("#year").textContent = new Date().getFullYear();

  // ---- Menú móvil
  const burger = $("#burger"), menu = $("#menu");
  const toggle = (open) => { menu.classList.toggle("open", open); burger.setAttribute("aria-expanded", open); burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú"); };
  burger.addEventListener("click", () => toggle(!menu.classList.contains("open")));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) toggle(false); });

  // ---- Abierto ahora (hora de Argentina)
  const arNow = () => {
    const p = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: "America/Argentina/Buenos_Aires", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date()).map((x) => [x.type, x.value]));
    const dia = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[p.weekday];
    return { dia, min: (+p.hour % 24) * 60 + +p.minute };
  };
  const toMin = (h) => { const [a, b] = h.split(":").map(Number); return a * 60 + b; };
  const estado = () => {
    const { dia, min } = arNow(), turnos = C.horarios[dia] || [];
    const t = turnos.find(([a, b]) => min >= toMin(a) && min < toMin(b));
    if (t) return { on: true, txt: `Abierto ahora · hasta las ${t[1]} h` };
    const sig = turnos.find(([a]) => min < toMin(a));
    if (sig) return { on: false, txt: `Cerrado ahora · abrimos hoy a las ${sig[0]} h` };
    const nom = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    for (let i = 1; i <= 7; i++) { const d = (dia + i) % 7, tt = C.horarios[d] || []; if (tt.length) return { on: false, txt: `Cerrado ahora · abrimos ${i === 1 ? "mañana" : "el " + nom[d]} a las ${tt[0][0]} h` }; }
    return { on: false, txt: "Cerrado ahora" };
  };
  const pintarEstado = () => { const s = estado(); $$(".status").forEach((n) => { n.textContent = s.txt; n.classList.toggle("on", s.on); n.classList.toggle("off", !s.on); }); };
  pintarEstado(); setInterval(pintarEstado, 60000);

  // Horarios (marca la fila de hoy)
  const hoy = arNow().dia, filaHoy = hoy === 0 || hoy === 1 ? 2 : hoy === 6 ? 1 : 0;
  $("#hrs").innerHTML = C.horariosTexto.map(([d, h], i) => `<tr class="${i === filaHoy ? "hoy" : ""}"><td>${d}</td><td>${h}</td></tr>`).join("");

  // ---- Catálogo
  const LIMITE = 12, state = { cat: "Todos", q: "", todo: false };
  const chips = $("#chips");
  ["Todos", ...C.categorias].forEach((c) => {
    const b = el("button", { class: "chip", role: "tab", "aria-selected": c === "Todos", type: "button" }, c);
    b.addEventListener("click", () => { state.cat = c; state.todo = false; $$(".chip").forEach((x) => x.setAttribute("aria-selected", x === b)); render(); });
    chips.append(b);
  });
  $("#q").addEventListener("input", (e) => { state.q = norm(e.target.value.trim()); state.todo = false; render(); });
  $("#more").addEventListener("click", () => { state.todo = true; render(); });

  function render() {
    const lista = C.productos.filter((p) => (state.cat === "Todos" || p.cat === state.cat) && (!state.q || norm(p.nombre + " " + p.desc + " " + p.cat).includes(state.q)));
    const limitar = state.cat === "Todos" && !state.q && !state.todo;
    // Al ver "Todos" sin búsqueda mostramos primero los destacados
    const orden = limitar ? [...lista].sort((a, b) => !!b.destacado - !!a.destacado) : lista;
    const visibles = limitar ? orden.slice(0, LIMITE) : orden;
    $("#grid").replaceChildren(...visibles.map((p) => {
      const a = el("article", { class: "card" });
      a.innerHTML = `<div class="card__img"><img src="${p.foto}" width="260" height="260" loading="lazy" alt="${p.nombre} en acero inoxidable"></div>
        <div class="card__b"><span class="card__tag">${p.cat}</span><h3>${p.nombre}</h3><p>${p.desc}</p></div>`;
      const btn = el("a", { class: "btn btn--wa", href: wa(`¡Hola! Vi su web y quería pedir presupuesto por: ${p.nombre}.`), target: "_blank", rel: "noopener" }, "Cotizar");
      a.querySelector(".card__b").append(btn);
      return a;
    }));
    $("#count").textContent = `${lista.length} ${lista.length === 1 ? "producto" : "productos"}`;
    $("#empty").hidden = lista.length > 0;
    const more = $("#more"); more.hidden = !limitar || lista.length <= LIMITE;
    more.textContent = `Ver los ${lista.length} productos`;
  }
  render();

  // ---- Ventajas y pasos
  $("#feat").innerHTML = C.ventajas.map((v) => `<article><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#f-${v.icono}"/></svg><h3>${v.titulo}</h3><p>${v.texto}</p></article>`).join("");
  $("#steps").innerHTML = C.pasos.map((s) => `<li><b>${s.titulo}</b><span>${s.texto}</span></li>`).join("");

  // ---- FAQ
  $("#faq").innerHTML = C.faq.map((f) => `<details><summary>${f.p}</summary><p>${f.r.replace(/\s*\/\/ PENDIENTE CLIENTE.*$/, "")}</p></details>`).join("");

  // ---- Galería + lightbox
  const gal = $("#gal");
  C.trabajos.forEach((t, i) => {
    const b = el("button", { type: "button", "aria-label": "Ampliar foto: " + t.alt }, `<img src="${t.foto}" width="${t.w}" height="${t.h}" loading="lazy" alt="${t.alt}">`);
    b.addEventListener("click", () => abrir(i)); gal.append(b);
  });
  const lb = $("#lb"), lbImg = $("#lb-img"); let cur = 0;
  const mostrar = (i) => { cur = (i + C.trabajos.length) % C.trabajos.length; lbImg.src = C.trabajos[cur].foto; lbImg.alt = C.trabajos[cur].alt; };
  const abrir = (i) => { mostrar(i); lb.showModal(); };
  $("#lb-x").addEventListener("click", () => lb.close());
  $("#lb-p").addEventListener("click", () => mostrar(cur - 1));
  $("#lb-n").addEventListener("click", () => mostrar(cur + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) lb.close(); });
  lb.addEventListener("keydown", (e) => { if (e.key === "ArrowLeft") mostrar(cur - 1); if (e.key === "ArrowRight") mostrar(cur + 1); });

  // ---- Formulario → WhatsApp
  $("#tipo").innerHTML = [...C.categorias, "Otra cosa / no sé cómo se llama"].map((c) => `<option>${c}</option>`).join("");
  $("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target), g = (k) => (f.get(k) || "").toString().trim();
    $("#err").hidden = !!g("nombre");
    if (!g("nombre")) return $("#form [name=nombre]").focus();
    const lineas = ["¡Hola! Vi su web y quiero pedir un presupuesto.", `• Nombre: ${g("nombre")}`, g("localidad") && `• Localidad: ${g("localidad")}`, `• Necesito: ${g("tipo")}`, g("medidas") && `• Medidas: ${g("medidas")}`, g("detalle") && `• Detalle: ${g("detalle")}`].filter(Boolean);
    window.open(wa(lineas.join("\n")), "_blank", "noopener");
  });
})();
