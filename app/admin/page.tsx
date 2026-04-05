"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import {
  Settings,
  FolderOpen,
  Wrench,
  Users,
  BarChart3,
  Briefcase,
  Image as ImageIcon,
  Mail,
  FileText,
  LogOut,
  Plus,
  Trash2,
  Save,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
} from "lucide-react";

type Tab =
  | "general"
  | "proyectos"
  | "servicios"
  | "equipo"
  | "metricas"
  | "carrera"
  | "clientes"
  | "mensajes"
  | "aplicaciones";

const TABS: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "general", label: "General", icon: Settings },
  { id: "proyectos", label: "Proyectos", icon: FolderOpen },
  { id: "servicios", label: "Servicios", icon: Wrench },
  { id: "equipo", label: "Equipo", icon: Users },
  { id: "metricas", label: "Métricas", icon: BarChart3 },
  { id: "carrera", label: "Carrera", icon: Briefcase },
  { id: "clientes", label: "Clientes", icon: ImageIcon },
  { id: "mensajes", label: "Mensajes", icon: Mail },
  { id: "aplicaciones", label: "Aplicaciones", icon: FileText },
];

const ICONOS_SERVICIO = ["briefcase", "search", "clipboard", "shield", "fileText", "shoppingCart"];
const CATEGORIAS_PROYECTO = ["Comercial", "Residencial", "Hotelería", "Institucional", "Megaproyecto"];

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminPage() {
  const [content, setContent] = useState<Record<string, any> | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/content")
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(setContent)
      .catch(() => router.push("/admin/login"));
  }, [router]);

  const save = async () => {
    if (!content) return;
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      alert("Error al guardar");
    }
    setSaving(false);
  };

  const logout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  const uploadFile = async (file: File, folder: string): Promise<string> => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", folder);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    return data.url || "";
  };

  if (!content) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-bg">
        <div className="w-8 h-8 border-2 border-teal-dark border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const update = (path: string, value: any) => {
    setContent((prev) => {
      if (!prev) return prev;
      const next = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gray-bg flex">
      {/* Mobile sidebar toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-teal-dark text-white p-2 shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Settings className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-brand-black flex flex-col transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-gray-800">
          <Logo color="white" />
          <p className="font-montserrat text-xs text-gray-500 mt-2 uppercase tracking-wider">
            Admin Panel
          </p>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                activeTab === tab.id
                  ? "bg-teal-dark/20 text-teal-light border-r-2 border-teal-light"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="font-montserrat">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-red-400 text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-montserrat">Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <h1 className="font-montserrat font-semibold text-lg text-brand-black capitalize pl-12 lg:pl-0">
            {TABS.find((t) => t.id === activeTab)?.label}
          </h1>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="text-teal-dark text-sm font-montserrat">✓ Guardado</span>
            )}
            <button
              onClick={save}
              disabled={saving}
              className="flex items-center gap-2 bg-teal-dark text-white font-montserrat font-bold text-xs uppercase tracking-wider px-6 py-2 hover:bg-teal-light hover:text-brand-black transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === "general" && <GeneralEditor content={content} update={update} />}
          {activeTab === "proyectos" && (
            <ProyectosEditor content={content} update={update} uploadFile={uploadFile} />
          )}
          {activeTab === "servicios" && <ServiciosEditor content={content} update={update} />}
          {activeTab === "equipo" && (
            <EquipoEditor content={content} update={update} uploadFile={uploadFile} />
          )}
          {activeTab === "metricas" && <MetricasEditor content={content} update={update} />}
          {activeTab === "carrera" && <CarreraEditor content={content} update={update} />}
          {activeTab === "clientes" && (
            <ClientesEditor content={content} update={update} uploadFile={uploadFile} />
          )}
          {activeTab === "mensajes" && <MensajesViewer content={content} update={update} />}
          {activeTab === "aplicaciones" && <AplicacionesViewer content={content} />}
        </div>
      </div>
    </div>
  );
}

/* =============================== EDITORS =============================== */

function InputField({
  label,
  value,
  onChange,
  type = "text",
  textarea = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  textarea?: boolean;
}) {
  const cls =
    "w-full border border-gray-300 px-4 py-2 font-montserrat text-sm focus:outline-none focus:border-teal-dark transition-colors bg-white";
  return (
    <div>
      <label className="font-montserrat font-bold text-xs uppercase tracking-wider text-gray-400 block mb-1">
        {label}
      </label>
      {textarea ? (
        <textarea rows={4} value={value} onChange={(e) => onChange(e.target.value)} className={`${cls} resize-none`} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </div>
  );
}

/* ---------- GENERAL ---------- */
function GeneralEditor({ content, update }: { content: any; update: (p: string, v: any) => void }) {
  const g = content.general;
  return (
    <div className="max-w-2xl space-y-6">
      <InputField label="Nombre empresa" value={g.nombre} onChange={(v) => update("general.nombre", v)} />
      <InputField label="Tagline" value={g.tagline} onChange={(v) => update("general.tagline", v)} />
      <InputField label="Quiénes somos" value={g.quienesSomos} onChange={(v) => update("general.quienesSomos", v)} textarea />
      <InputField label="Misión" value={g.mision} onChange={(v) => update("general.mision", v)} textarea />
      <InputField label="Visión" value={g.vision} onChange={(v) => update("general.vision", v)} textarea />
      <InputField label="Teléfono" value={g.telefono} onChange={(v) => update("general.telefono", v)} />
      <InputField label="Email" value={g.email} onChange={(v) => update("general.email", v)} type="email" />
      <InputField label="Dirección" value={g.direccion} onChange={(v) => update("general.direccion", v)} />
      <InputField label="Instagram" value={g.redes?.instagram || ""} onChange={(v) => update("general.redes.instagram", v)} />
      <InputField label="LinkedIn" value={g.redes?.linkedin || ""} onChange={(v) => update("general.redes.linkedin", v)} />
      <InputField label="Facebook" value={g.redes?.facebook || ""} onChange={(v) => update("general.redes.facebook", v)} />
    </div>
  );
}

/* ---------- PROYECTOS ---------- */
function ProyectosEditor({
  content,
  update,
  uploadFile,
}: {
  content: any;
  update: (p: string, v: any) => void;
  uploadFile: (f: File, folder: string) => Promise<string>;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const addProject = () => {
    const newP = {
      id: `proyecto-${Date.now()}`,
      nombre: "Nuevo Proyecto",
      categoria: "Comercial",
      ubicacion: "",
      periodo: "",
      promotor: "",
      inversion: "",
      area: "",
      descripcion: "",
      servicios: [],
      imagenes: [],
      logoCliente: "",
    };
    update("proyectos", [...content.proyectos, newP]);
    setExpandedId(newP.id);
  };

  const removeProject = (id: string) => {
    update(
      "proyectos",
      content.proyectos.filter((p: any) => p.id !== id)
    );
  };

  const updateProject = (id: string, field: string, value: any) => {
    update(
      "proyectos",
      content.proyectos.map((p: any) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleImageUpload = async (id: string, files: FileList) => {
    const slug = slugify(content.proyectos.find((p: any) => p.id === id)?.nombre || id);
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const url = await uploadFile(file, `proyectos/${slug}`);
      if (url) urls.push(url);
    }
    const project = content.proyectos.find((p: any) => p.id === id);
    if (project) {
      updateProject(id, "imagenes", [...project.imagenes, ...urls]);
    }
  };

  const moveProject = (index: number, direction: -1 | 1) => {
    const arr = [...content.proyectos];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= arr.length) return;
    [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];
    update("proyectos", arr);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={addProject}
        className="flex items-center gap-2 bg-teal-dark text-white font-montserrat font-bold text-xs uppercase tracking-wider px-4 py-2 hover:bg-teal-light hover:text-brand-black transition-colors"
      >
        <Plus className="w-4 h-4" /> Agregar proyecto
      </button>

      {content.proyectos.map((p: any, i: number) => (
        <div key={p.id} className="bg-white border border-gray-200">
          <div
            className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50"
            onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
          >
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    moveProject(i, -1);
                  }}
                  className="text-gray-400 hover:text-brand-black"
                >
                  <ChevronUp className="w-3 h-3" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    moveProject(i, 1);
                  }}
                  className="text-gray-400 hover:text-brand-black"
                >
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>
              <span className="font-montserrat font-semibold text-sm">{p.nombre}</span>
              <span className="font-montserrat text-xs text-gray-400">{p.categoria}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm("¿Eliminar este proyecto?")) removeProject(p.id);
                }}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedId === p.id ? "rotate-180" : ""}`} />
            </div>
          </div>

          {expandedId === p.id && (
            <div className="px-4 pb-4 space-y-4 border-t border-gray-100 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Nombre" value={p.nombre} onChange={(v) => updateProject(p.id, "nombre", v)} />
                <div>
                  <label className="font-montserrat font-bold text-xs uppercase tracking-wider text-gray-400 block mb-1">
                    Categoría
                  </label>
                  <select
                    value={p.categoria}
                    onChange={(e) => updateProject(p.id, "categoria", e.target.value)}
                    className="w-full border border-gray-300 px-4 py-2 font-montserrat text-sm focus:outline-none focus:border-teal-dark bg-white"
                  >
                    {CATEGORIAS_PROYECTO.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <InputField label="Ubicación" value={p.ubicacion} onChange={(v) => updateProject(p.id, "ubicacion", v)} />
                <InputField label="Periodo" value={p.periodo} onChange={(v) => updateProject(p.id, "periodo", v)} />
                <InputField label="Promotor / Cliente" value={p.promotor} onChange={(v) => updateProject(p.id, "promotor", v)} />
                <div>
                  <label className="font-montserrat font-bold text-xs uppercase tracking-wider text-gray-400 block mb-1">
                    Logo del Cliente
                  </label>
                  <div className="flex items-center gap-3">
                    {p.logoCliente && (
                      <div className="relative group">
                        <img src={p.logoCliente} alt="" className="h-12 w-auto object-contain border border-gray-200 bg-white p-1" />
                        <button
                          onClick={() => updateProject(p.id, "logoCliente", "")}
                          className="absolute -top-1 -right-1 bg-red-500 text-white p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = await uploadFile(file, "clientes");
                          if (url) updateProject(p.id, "logoCliente", url);
                        }
                      }}
                      className="font-montserrat text-sm"
                    />
                  </div>
                </div>
                <InputField label="Inversión" value={p.inversion} onChange={(v) => updateProject(p.id, "inversion", v)} />
                <InputField label="Área" value={p.area} onChange={(v) => updateProject(p.id, "area", v)} />
              </div>
              <InputField label="Descripción" value={p.descripcion} onChange={(v) => updateProject(p.id, "descripcion", v)} textarea />
              <InputField
                label="Servicios prestados (separados por coma)"
                value={p.servicios.join(", ")}
                onChange={(v) =>
                  updateProject(
                    p.id,
                    "servicios",
                    v.split(",").map((s: string) => s.trim()).filter(Boolean)
                  )
                }
              />

              {/* Images */}
              <div>
                <label className="font-montserrat font-bold text-xs uppercase tracking-wider text-gray-400 block mb-2">
                  Imágenes
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {p.imagenes.map((img: string, j: number) => (
                    <div key={j} className="relative w-24 h-24 group">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() =>
                          updateProject(
                            p.id,
                            "imagenes",
                            p.imagenes.filter((_: string, k: number) => k !== j)
                          )
                        }
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => e.target.files && handleImageUpload(p.id, e.target.files)}
                  className="font-montserrat text-sm"
                />
                <div className="mt-2">
                  <InputField
                    label="O agregar URL de imagen"
                    value=""
                    onChange={(v) => {
                      if (v) updateProject(p.id, "imagenes", [...p.imagenes, v]);
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------- SERVICIOS ---------- */
function ServiciosEditor({ content, update }: { content: any; update: (p: string, v: any) => void }) {
  const addService = () => {
    update("servicios", [
      ...content.servicios,
      { id: `servicio-${Date.now()}`, nombre: "Nuevo Servicio", descripcion: "", icono: "briefcase" },
    ]);
  };

  const removeService = (id: string) => {
    update("servicios", content.servicios.filter((s: any) => s.id !== id));
  };

  const updateService = (id: string, field: string, value: any) => {
    update("servicios", content.servicios.map((s: any) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  return (
    <div className="max-w-2xl space-y-4">
      <button
        onClick={addService}
        className="flex items-center gap-2 bg-teal-dark text-white font-montserrat font-bold text-xs uppercase tracking-wider px-4 py-2 hover:bg-teal-light hover:text-brand-black transition-colors"
      >
        <Plus className="w-4 h-4" /> Agregar servicio
      </button>

      {content.servicios.map((s: any) => (
        <div key={s.id} className="bg-white p-4 border border-gray-200 space-y-3">
          <div className="flex items-center justify-between">
            <InputField label="Nombre" value={s.nombre} onChange={(v) => updateService(s.id, "nombre", v)} />
            <button onClick={() => removeService(s.id)} className="text-gray-400 hover:text-red-500 ml-4 mt-5">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <InputField label="Descripción" value={s.descripcion} onChange={(v) => updateService(s.id, "descripcion", v)} textarea />
          <div>
            <label className="font-montserrat font-bold text-xs uppercase tracking-wider text-gray-400 block mb-1">
              Ícono
            </label>
            <select
              value={s.icono}
              onChange={(e) => updateService(s.id, "icono", e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 font-montserrat text-sm focus:outline-none focus:border-teal-dark bg-white"
            >
              {ICONOS_SERVICIO.map((ic) => (
                <option key={ic} value={ic}>
                  {ic}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- EQUIPO ---------- */
function EquipoEditor({
  content,
  update,
  uploadFile,
}: {
  content: any;
  update: (p: string, v: any) => void;
  uploadFile: (f: File, folder: string) => Promise<string>;
}) {
  const addMember = () => {
    update("equipo", [
      ...content.equipo,
      { id: `miembro-${Date.now()}`, nombre: "Nuevo Miembro", cargo: "", foto: "", linkedin: "" },
    ]);
  };

  const removeMember = (id: string) => {
    update("equipo", content.equipo.filter((m: any) => m.id !== id));
  };

  const updateMember = (id: string, field: string, value: any) => {
    update("equipo", content.equipo.map((m: any) => (m.id === id ? { ...m, [field]: value } : m)));
  };

  const handlePhotoUpload = async (id: string, file: File) => {
    const url = await uploadFile(file, "equipo");
    if (url) updateMember(id, "foto", url);
  };

  return (
    <div className="max-w-2xl space-y-4">
      <button
        onClick={addMember}
        className="flex items-center gap-2 bg-teal-dark text-white font-montserrat font-bold text-xs uppercase tracking-wider px-4 py-2 hover:bg-teal-light hover:text-brand-black transition-colors"
      >
        <Plus className="w-4 h-4" /> Agregar miembro
      </button>

      {content.equipo.map((m: any) => (
        <div key={m.id} className="bg-white p-4 border border-gray-200 space-y-3">
          <div className="flex items-start gap-4">
            {m.foto && <img src={m.foto} alt="" className="w-16 h-16 object-cover" />}
            <div className="flex-1 space-y-3">
              <InputField label="Nombre" value={m.nombre} onChange={(v) => updateMember(m.id, "nombre", v)} />
              <InputField label="Cargo" value={m.cargo} onChange={(v) => updateMember(m.id, "cargo", v)} />
              <InputField label="LinkedIn" value={m.linkedin} onChange={(v) => updateMember(m.id, "linkedin", v)} />
              <div>
                <label className="font-montserrat font-bold text-xs uppercase tracking-wider text-gray-400 block mb-1">
                  Foto
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handlePhotoUpload(m.id, e.target.files[0])}
                  className="font-montserrat text-sm"
                />
              </div>
            </div>
            <button onClick={() => removeMember(m.id)} className="text-gray-400 hover:text-red-500">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- MÉTRICAS ---------- */
function MetricasEditor({ content, update }: { content: any; update: (p: string, v: any) => void }) {
  const updateMetric = (index: number, field: string, value: string) => {
    const metricas = content.metricas.map((m: any, i: number) =>
      i === index ? { ...m, [field]: value } : m
    );
    update("metricas", metricas);
  };

  return (
    <div className="max-w-2xl space-y-4">
      {content.metricas.map((m: any, i: number) => (
        <div key={i} className="bg-white p-4 border border-gray-200 grid grid-cols-2 gap-4">
          <InputField label="Valor" value={m.valor} onChange={(v) => updateMetric(i, "valor", v)} />
          <InputField label="Label" value={m.label} onChange={(v) => updateMetric(i, "label", v)} />
        </div>
      ))}
    </div>
  );
}

/* ---------- CARRERA ---------- */
function CarreraEditor({ content, update }: { content: any; update: (p: string, v: any) => void }) {
  const addPosition = () => {
    update("carrera", [
      ...content.carrera,
      {
        id: `posicion-${Date.now()}`,
        titulo: "Nueva Posición",
        descripcion: "",
        requisitos: [],
        activo: true,
      },
    ]);
  };

  const removePosition = (id: string) => {
    update("carrera", content.carrera.filter((c: any) => c.id !== id));
  };

  const updatePosition = (id: string, field: string, value: any) => {
    update("carrera", content.carrera.map((c: any) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  return (
    <div className="max-w-2xl space-y-4">
      <button
        onClick={addPosition}
        className="flex items-center gap-2 bg-teal-dark text-white font-montserrat font-bold text-xs uppercase tracking-wider px-4 py-2 hover:bg-teal-light hover:text-brand-black transition-colors"
      >
        <Plus className="w-4 h-4" /> Agregar posición
      </button>

      {content.carrera.map((c: any) => (
        <div key={c.id} className="bg-white p-4 border border-gray-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => updatePosition(c.id, "activo", !c.activo)}
                className={`${c.activo ? "text-teal-dark" : "text-gray-300"}`}
              >
                {c.activo ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <span className="font-montserrat text-xs text-gray-400">
                {c.activo ? "Activo" : "Inactivo"}
              </span>
            </div>
            <button onClick={() => removePosition(c.id)} className="text-gray-400 hover:text-red-500">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <InputField label="Título" value={c.titulo} onChange={(v) => updatePosition(c.id, "titulo", v)} />
          <InputField label="Descripción" value={c.descripcion} onChange={(v) => updatePosition(c.id, "descripcion", v)} textarea />
          <InputField
            label="Requisitos (uno por línea)"
            value={c.requisitos.join("\n")}
            onChange={(v) => updatePosition(c.id, "requisitos", v.split("\n").filter(Boolean))}
            textarea
          />
        </div>
      ))}
    </div>
  );
}

/* ---------- CLIENTES ---------- */
function ClientesEditor({
  content,
  update,
  uploadFile,
}: {
  content: any;
  update: (p: string, v: any) => void;
  uploadFile: (f: File, folder: string) => Promise<string>;
}) {
  const handleUpload = async (files: FileList) => {
    const newLogos: string[] = [];
    for (const file of Array.from(files)) {
      const url = await uploadFile(file, "clientes");
      if (url) newLogos.push(url);
    }
    update("clientes", [...(content.clientes || []), ...newLogos]);
  };

  const removeClient = (index: number) => {
    update("clientes", content.clientes.filter((_: string, i: number) => i !== index));
  };

  const moveClient = (index: number, direction: -1 | 1) => {
    const arr = [...content.clientes];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= arr.length) return;
    [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];
    update("clientes", arr);
  };

  return (
    <div className="max-w-2xl space-y-4">
      <div>
        <label className="font-montserrat font-bold text-xs uppercase tracking-wider text-gray-400 block mb-2">
          Subir logos
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => e.target.files && handleUpload(e.target.files)}
          className="font-montserrat text-sm"
        />
      </div>
      <div className="flex flex-wrap gap-4">
        {(content.clientes || []).map((logo: string, i: number) => (
          <div key={i} className="relative bg-white p-2 border border-gray-200 group">
            <img src={logo} alt="" className="w-24 h-16 object-contain" />
            <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => moveClient(i, -1)} className="bg-gray-200 p-0.5"><ChevronUp className="w-3 h-3" /></button>
              <button onClick={() => moveClient(i, 1)} className="bg-gray-200 p-0.5"><ChevronDown className="w-3 h-3" /></button>
              <button onClick={() => removeClient(i)} className="bg-red-500 text-white p-0.5"><Trash2 className="w-3 h-3" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- MENSAJES ---------- */
function MensajesViewer({ content, update }: { content: any; update: (p: string, v: any) => void }) {
  const toggleRead = (index: number) => {
    const mensajes = content.mensajes.map((m: any, i: number) =>
      i === index ? { ...m, leido: !m.leido } : m
    );
    update("mensajes", mensajes);
  };

  if (!content.mensajes?.length) {
    return <p className="text-gray-400 font-montserrat text-sm">No hay mensajes.</p>;
  }

  return (
    <div className="space-y-4">
      {content.mensajes.map((m: any, i: number) => (
        <div
          key={i}
          className={`bg-white p-4 border border-gray-200 ${m.leido ? "opacity-60" : ""}`}
        >
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="font-montserrat font-semibold text-sm">{m.nombre}</span>
              <span className="font-montserrat text-xs text-gray-400 ml-2">{m.email}</span>
              {m.telefono && <span className="font-montserrat text-xs text-gray-400 ml-2">{m.telefono}</span>}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-montserrat text-xs text-gray-400">
                {new Date(m.fecha).toLocaleDateString("es")}
              </span>
              <button
                onClick={() => toggleRead(i)}
                className={`text-xs font-montserrat ${m.leido ? "text-gray-400" : "text-teal-dark"}`}
              >
                {m.leido ? "Marcar no leído" : "Marcar leído"}
              </button>
            </div>
          </div>
          <p className="text-gray-600 text-sm">{m.mensaje}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------- APLICACIONES ---------- */
function AplicacionesViewer({ content }: { content: any }) {
  if (!content.aplicaciones?.length) {
    return <p className="text-gray-400 font-montserrat text-sm">No hay aplicaciones.</p>;
  }

  return (
    <div className="space-y-4">
      {content.aplicaciones.map((a: any, i: number) => (
        <div key={i} className="bg-white p-4 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-montserrat font-semibold text-sm">{a.nombre}</span>
              <span className="font-montserrat text-xs text-gray-400 ml-2">{a.email}</span>
            </div>
            <span className="font-montserrat text-xs text-gray-400">
              {new Date(a.fecha).toLocaleDateString("es")}
            </span>
          </div>
          <p className="font-montserrat text-sm text-gray-600 mt-1">Posición: {a.posicion}</p>
          {a.cv && (
            <a
              href={a.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-teal-dark text-sm hover:underline font-montserrat"
            >
              Ver CV →
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
