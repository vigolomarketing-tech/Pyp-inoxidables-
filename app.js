(() => {
  const C = CONFIG, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const wa = (t) => `https://wa.me/${C.contacto.whatsapp}?text=${encodeURIComponent(t)}`;
  const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const el = (tag, attrs = {}, html = "") => { const e = document.createElement(tag); Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v)); e.innerHTML = html; return e; };
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hoverOK = matchMedia("(hover: hover)").matches;

  // ---- Textos y enlaces desde CONFIG
  $$("[data-direccion]").forEach((n) => (n.textContent = C.contacto.direccion));
  $$("[data-tel]").forEach((n) => { n.textContent = C.contacto.telefono; n.href = "tel:" + C.contacto.telefonoLink; });
  $$("[data-wa]").forEach((a) => { a.href = wa(a.dataset.wa); a.target = "_blank"; a.rel = "noopener"; });
  $("#wa-float").href = wa(C.contacto.mensajeWhatsapp); $("#wa-float").target = "_blank"; $("#wa-float").rel = "noopener";
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

  // ---- Barra de progreso + parallax del hero
  const prog = $("#progress"), heroBg = $("#hero-bg");
  let tick = false;
  addEventListener("scroll", () => {
    if (tick) return; tick = true;
    requestAnimationFrame(() => {
      const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
      prog.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      if (!reduce && y < innerHeight * 1.2) heroBg.style.transform = `translate3d(0,${y * 0.25}px,0)`;
      tick = false;
    });
  }, { passive: true });

  // ---- Revelado al scrollear
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  const observar = () => $$(".rv:not(.in)").forEach((n) => io.observe(n));

  // ---- Abierto ahora (hora de Argentina)
  const arNow = () => {
    const p = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: "America/Argentina/Buenos_Aires", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date()).map((x) => [x.type, x.value]));
    return { dia: { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[p.weekday], min: (+p.hour % 24) * 60 + +p.minute };
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
  const hoy = arNow().dia, filaHoy = hoy === 0 || hoy === 1 ? 2 : hoy === 6 ? 1 : 0;
  $("#hrs").innerHTML = C.horariosTexto.map(([d, h], i) => `<tr class="${i === filaHoy ? "hoy" : ""}"><td>${d}</td><td>${h}</td></tr>`).join("");

  // ---- Ticker
  const palabras = ["Mesadas", "Bachas", "Topineras", "Campanas", "Estanterías", "Carros", "Pasaplatos", "Alacenas", "Escaleras", "A medida"];
  const fila = `<span>${palabras.join("</span><span>")}</span>`;
  $("#ticker").innerHTML = fila + fila;

  // =====================================================
  // Mesa de acero en 3D (CSS 3D, sin librerías)
  // =====================================================
  const div = (c, s) => { const d = document.createElement("div"); if (c) d.className = c; if (s) d.style.cssText = s; return d; };
  function box(w, h, d, x, y, z, cls = "") {
    const b = div("bx " + cls, `width:${w}px;height:${h}px;margin:${-h / 2}px 0 0 ${-w / 2}px;transform:translate3d(${x}px,${-y}px,${z}px)`);
    const f = (c, st) => b.append(div("f " + c, st));
    f("fr", `width:${w}px;height:${h}px;transform:translateZ(${d / 2}px)`);
    f("bk", `width:${w}px;height:${h}px;transform:rotateY(180deg) translateZ(${d / 2}px)`);
    f("rt", `width:${d}px;height:${h}px;left:${(w - d) / 2}px;transform:rotateY(90deg) translateZ(${w / 2}px)`);
    f("lf", `width:${d}px;height:${h}px;left:${(w - d) / 2}px;transform:rotateY(-90deg) translateZ(${w / 2}px)`);
    f("tp", `width:${w}px;height:${d}px;top:${(h - d) / 2}px;transform:rotateX(90deg) translateZ(${h / 2}px)`);
    f("bt", `width:${w}px;height:${d}px;top:${(h - d) / 2}px;transform:rotateX(-90deg) translateZ(${h / 2}px)`);
    return b;
  }
  function buildTable(rot, o) {
    const { L, W, est, pas, bac, rue } = o, H = 90, base = rue ? 9 : 0, parts = [];
    const sh = div("shadow", `width:${L + 90}px;height:${W + 90}px;left:${-(L + 90) / 2}px;top:${-(W + 90) / 2}px;transform:translateY(1px) rotateX(90deg)`);
    parts.push(sh);
    // patas
    const lx = L / 2 - 3, lz = W / 2 - 3, lh = H - 4 - base;
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz]) => parts.push(box(4, lh, 4, sx * lx, base + lh / 2, sz * lz)));
    if (rue) [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz]) => parts.push(box(7, 9, 7, sx * lx, 4.5, sz * lz, "bx--dark")));
    // estantes inferiores y travesaños
    const niveles = est === 1 ? [base + 18] : est === 2 ? [base + 16, base + 47] : [];
    niveles.forEach((y) => parts.push(box(L - 7, 1.6, W - 7, 0, y, 0)));
    parts.push(box(L - 6, 4, 2, 0, H - 8, -(W / 2 - 3)), box(L - 6, 4, 2, 0, H - 8, W / 2 - 3));
    // tapa y respaldo
    parts.push(box(L, 4, W, 0, H - 2, 0));
    parts.push(box(L, 9, 1.8, 0, H + 4.5, -(W / 2) + 1));
    // bacha
    if (bac) {
      const sw = Math.min(64, L * 0.38), sd = W - 22;
      parts.push(box(sw, 1, sd, -L / 2 + sw / 2 + 14, H + 0.6, 2, "bx--sink"));
      parts.push(box(2.4, 22, 2.4, -L / 2 + sw / 2 + 14, H + 11, -W / 2 + 7), box(2.4, 2.4, 12, -L / 2 + sw / 2 + 14, H + 22, -W / 2 + 13));
    }
    // pasaplatos
    if (pas) {
      const px = L / 2 - 7, pz = -(W / 2) + 9, ph = 56;
      parts.push(box(3, ph, 3, -px, H + ph / 2, pz), box(3, ph, 3, px, H + ph / 2, pz));
      parts.push(box(L - 6, 2.4, 26, 0, H + ph, pz + 11));
      parts.push(box(L - 6, 8, 1.6, 0, H + ph + 4, pz - 1.5));
    }
    rot.replaceChildren(...parts);
    return { total: H + (pas ? 66 : 14), r: Math.hypot(L, W) };
  }
  function mkStage(host, getOpts, { auto = true } = {}) {
    host.innerHTML = '<div class="scale"><div class="rot"></div></div>';
    const scaleEl = $(".scale", host), rot = $(".rot", host);
    let rx = -22, ry = -32, vel = auto ? 0.18 : 0, drag = false, lx = 0, ly = 0, visible = true, info;
    const fit = () => { const w = host.clientWidth, h = host.clientHeight, s = Math.min(2.7, (w * 0.8) / info.r, (h * 0.74) / info.total); scaleEl.style.transform = `translateY(${(info.total * s) / 2}px) scale(${s})`; };
    const apply = () => (rot.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`);
    const rebuild = () => { info = buildTable(rot, getOpts()); fit(); apply(); };
    new ResizeObserver(() => info && fit()).observe(host);
    host.addEventListener("pointerdown", (e) => { drag = true; lx = e.clientX; ly = e.clientY; vel = 0; host.setPointerCapture(e.pointerId); });
    host.addEventListener("pointermove", (e) => { if (!drag) return; const dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY; ry += dx * 0.55; rx = Math.max(-55, Math.min(-4, rx + dy * 0.3)); vel = dx * 0.1; apply(); });
    const up = () => { drag = false; };
    host.addEventListener("pointerup", up); host.addEventListener("pointercancel", up);
    new IntersectionObserver((es) => (visible = es[0].isIntersecting)).observe(host);
    (function loop() {
      if (visible && !drag && !reduce) { ry += vel; if (auto) vel += (0.18 - vel) * 0.03; else vel *= 0.94; apply(); }
      requestAnimationFrame(loop);
    })();
    rebuild();
    return { rebuild };
  }

  // Mesa del hero (decorativa, gira sola y se puede arrastrar)
  mkStage($("#hero-stage"), () => ({ L: 200, W: 80, est: 1, pas: true, bac: true, rue: false }));

  // Configurador
  const cfg = { L: 180, W: 70, est: 1, pas: true, bac: false, rue: false };
  const cfgStage = mkStage($("#cfg-stage"), () => cfg, { auto: false });
  const resumen = () => {
    const ex = [cfg.pas && "pasaplatos", cfg.bac && "bacha", cfg.rue && "ruedas"].filter(Boolean);
    const estT = cfg.est === 0 ? "sin estantes inferiores" : cfg.est === 1 ? "1 estante inferior" : "2 estantes inferiores";
    const txt = `Mesada de ${cfg.L} × ${cfg.W} cm, ${estT}${ex.length ? ", con " + ex.join(", ").replace(/, ([^,]*)$/, " y $1") : ""}`;
    $("#cfg-sum").textContent = txt;
    $("#cfg-wa").href = wa(`¡Hola! Armé esta mesa en su web y quería pedir presupuesto:\n• ${txt}\n¿Me pasan precio y plazo?`);
    $("#o-L").textContent = cfg.L + " cm"; $("#o-W").textContent = cfg.W + " cm";
  };
  const cambio = () => { resumen(); cfgStage.rebuild(); };
  $("#c-L").addEventListener("input", (e) => { cfg.L = +e.target.value; cambio(); });
  $("#c-W").addEventListener("input", (e) => { cfg.W = +e.target.value; cambio(); });
  $("#c-pas").addEventListener("change", (e) => { cfg.pas = e.target.checked; cambio(); });
  $("#c-bac").addEventListener("change", (e) => { cfg.bac = e.target.checked; cambio(); });
  $("#c-rue").addEventListener("change", (e) => { cfg.rue = e.target.checked; cambio(); });
  $("#c-est").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; cfg.est = +b.dataset.v; $$("#c-est button").forEach((x) => x.setAttribute("aria-checked", x === b)); cambio(); });
  resumen();

  // =====================================================
  // Carruseles deslizables
  // =====================================================
  function dragScroll(t) {
    let down = false, sx = 0, sl = 0, moved = 0;
    t.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") return; down = true; sx = e.clientX; sl = t.scrollLeft; moved = 0; });
    addEventListener("pointermove", (e) => { if (!down) return; const dx = e.clientX - sx; moved = Math.max(moved, Math.abs(dx)); if (moved > 5) { t.classList.add("drag"); t.scrollLeft = sl - dx; } });
    addEventListener("pointerup", () => { if (!down) return; down = false; setTimeout(() => t.classList.remove("drag"), 0); });
    t.addEventListener("click", (e) => { if (moved > 5) { e.preventDefault(); e.stopPropagation(); moved = 0; } }, true);
  }
  function flechas(sec, track) {
    $$(".arrows button", sec).forEach((b) => b.addEventListener("click", () => track.scrollBy({ left: +b.dataset.dir * Math.min(track.clientWidth * 0.8, 620), behavior: "smooth" })));
  }

  // Catálogo
  const state = { cat: "Todos", q: "" }, grid = $("#grid");
  const chips = $("#chips");
  ["Todos", ...C.categorias].forEach((c) => {
    const b = el("button", { class: "chip", role: "tab", "aria-selected": c === "Todos", type: "button" }, c);
    b.addEventListener("click", () => { state.cat = c; $$(".chip").forEach((x) => x.setAttribute("aria-selected", x === b)); render(); });
    chips.append(b);
  });
  $("#q").addEventListener("input", (e) => { state.q = norm(e.target.value.trim()); render(); });
  const bar = $("#bar");
  const barra = () => { const m = grid.scrollWidth - grid.clientWidth, pct = Math.max(14, (grid.clientWidth / grid.scrollWidth) * 100), pos = m > 0 ? (grid.scrollLeft / m) * (100 - pct) : 0; bar.style.width = pct + "%"; bar.style.transform = `translateX(${(pos / pct) * 100}%)`; };
  grid.addEventListener("scroll", barra, { passive: true });
  function render() {
    const lista = C.productos.filter((p) => (state.cat === "Todos" || p.cat === state.cat) && (!state.q || norm(p.nombre + " " + p.desc + " " + p.cat).includes(state.q)));
    const orden = state.cat === "Todos" && !state.q ? [...lista].sort((a, b) => !!b.destacado - !!a.destacado) : lista;
    grid.replaceChildren(...orden.map((p) => {
      const a = el("article", { class: "card" });
      a.innerHTML = `<img src="${p.foto}" width="260" height="260" loading="lazy" alt="${p.nombre} en acero inoxidable"><div class="card__b"><span class="card__tag">${p.cat}</span><h3>${p.nombre}</h3><p>${p.desc}</p></div>`;
      a.querySelector(".card__b").append(el("a", { class: "btn btn--wa", href: wa(`¡Hola! Vi su web y quería pedir presupuesto por: ${p.nombre}.`), target: "_blank", rel: "noopener" }, "Cotizar"));
      if (hoverOK && !reduce) {
        a.addEventListener("pointermove", (e) => { const r = a.getBoundingClientRect(); a.style.setProperty("--ry", ((e.clientX - r.left) / r.width - 0.5) * 12 + "deg"); a.style.setProperty("--rx", (0.5 - (e.clientY - r.top) / r.height) * 10 + "deg"); });
        a.addEventListener("pointerleave", () => { a.style.setProperty("--ry", "0deg"); a.style.setProperty("--rx", "0deg"); });
      }
      return a;
    }));
    grid.scrollTo({ left: 0 });
    $("#count").textContent = `${lista.length} ${lista.length === 1 ? "producto" : "productos"}`;
    $("#empty").hidden = lista.length > 0;
    barra();
  }
  render(); dragScroll(grid); flechas($("#productos"), grid);

  // Ventajas
  $("#feat").innerHTML = C.ventajas.map((v) => `<article class="feat"><div class="feat__n">${v.big}</div><div class="feat__s">${v.sub}</div><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#f-${v.icono}"/></svg><h3>${v.titulo}</h3><p>${v.texto}</p></article>`).join("");
  dragScroll($("#feat"));
  $("#steps").innerHTML = C.pasos.map((s, i) => `<li class="rv" style="--d:${i * 0.1}s"><b>${s.titulo}</b><span>${s.texto}</span></li>`).join("");
  $("#faq").innerHTML = C.faq.map((f) => `<details><summary>${f.p}</summary><p>${f.r.replace(/\s*\/\/ PENDIENTE CLIENTE.*$/, "")}</p></details>`).join("");

  // Galería filmstrip con efecto de foco al centro
  const gal = $("#gal");
  C.trabajos.forEach((t, i) => {
    const b = el("button", { type: "button", "aria-label": "Ampliar foto: " + t.alt }, `<img src="${t.foto}" width="${t.w}" height="${t.h}" loading="lazy" alt="${t.alt}">`);
    b.addEventListener("click", () => abrir(i)); gal.append(b);
  });
  const focoGal = () => {
    const c = gal.scrollLeft + gal.clientWidth / 2;
    $$("button", gal).forEach((b) => {
      const d = Math.min(1, Math.abs(b.offsetLeft + b.offsetWidth / 2 - c) / (gal.clientWidth * 0.62));
      b.style.transform = `scale(${1 - d * 0.15})`; b.style.opacity = 1 - d * 0.55;
    });
  };
  gal.addEventListener("scroll", () => requestAnimationFrame(focoGal), { passive: true });
  addEventListener("load", focoGal); addEventListener("resize", focoGal); focoGal();
  dragScroll(gal); flechas($("#trabajos"), gal);

  const lb = $("#lb"), lbImg = $("#lb-img"); let cur = 0;
  const mostrar = (i) => { cur = (i + C.trabajos.length) % C.trabajos.length; lbImg.src = C.trabajos[cur].foto; lbImg.alt = C.trabajos[cur].alt; };
  const abrir = (i) => { mostrar(i); lb.showModal(); };
  $("#lb-x").addEventListener("click", () => lb.close());
  $("#lb-p").addEventListener("click", () => mostrar(cur - 1));
  $("#lb-n").addEventListener("click", () => mostrar(cur + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) lb.close(); });
  lb.addEventListener("keydown", (e) => { if (e.key === "ArrowLeft") mostrar(cur - 1); if (e.key === "ArrowRight") mostrar(cur + 1); });

  // Parallax suave de la foto de "a medida"
  const blobImg = $(".blob img");
  addEventListener("scroll", () => { if (reduce) return; const r = blobImg.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) blobImg.style.transform = `scale(1.14) translateY(${(r.top + r.height / 2 - innerHeight / 2) * -0.06}px)`; }, { passive: true });

  // Formulario → WhatsApp
  $("#tipo").innerHTML = [...C.categorias, "Otra cosa / no sé cómo se llama"].map((c) => `<option>${c}</option>`).join("");
  $("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target), g = (k) => (f.get(k) || "").toString().trim();
    $("#err").hidden = !!g("nombre");
    if (!g("nombre")) return $("#form [name=nombre]").focus();
    const lineas = ["¡Hola! Vi su web y quiero pedir un presupuesto.", `• Nombre: ${g("nombre")}`, g("localidad") && `• Localidad: ${g("localidad")}`, `• Necesito: ${g("tipo")}`, g("medidas") && `• Medidas: ${g("medidas")}`, g("detalle") && `• Detalle: ${g("detalle")}`].filter(Boolean);
    window.open(wa(lineas.join("\n")), "_blank", "noopener");
  });

  observar();
})();
