import { useEffect, useMemo, useState } from "react";
import { Search, RefreshCw } from "lucide-react";
import { membersService } from "../services/members";
import type { Member, MemberStatus } from "../services/members";

const statusLabels: Record<MemberStatus, string> = {
  ACTIVE: "Activo",
  INACTIVE: "Inactivo",
  SUSPENDED: "Suspendido",
  DECEASED: "Fallecido",
};

const statusColors: Record<MemberStatus, string> = {
  ACTIVE: "bg-emerald-500/20 text-emerald-300",
  INACTIVE: "bg-muted text-muted-foreground",
  SUSPENDED: "bg-amber-500/20 text-amber-300",
  DECEASED: "bg-red-500/20 text-red-300",
};

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"" | MemberStatus>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await membersService.list({
        page,
        perPage,
        search: search || undefined,
        status: status || undefined,
      });
      setMembers(response.data);
      setTotalPages(response.meta.totalPages || 1);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "No se pudieron cargar los socios",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, status]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    void fetchMembers();
  };

  const handleStatusChange = (value: string) => {
    setPage(1);
    setStatus(value as MemberStatus | "");
  };

  const formattedMembers = useMemo(() => {
    return members.map((member) => ({
      ...member,
      memberSinceFormatted: member.memberSince
        ? new Intl.DateTimeFormat("es-CL").format(new Date(member.memberSince))
        : "-",
      monthlyFeeFormatted: new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        minimumFractionDigits: 0,
      }).format(Number(member.monthlyFee ?? 0)),
    }));
  }, [members]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-display-lg font-bold tracking-tight">Socios</h1>
        <p className="text-body-lg text-muted-foreground">
          Administra el padrón de socios y su estado de membresía.
        </p>
      </div>

      <div className="glass p-4 rounded-xl border border-border space-y-4">
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={16}
            />
            <input
              type="text"
              placeholder="Buscar por nombre, email, RUT..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-secondary border border-border rounded-lg py-2 pl-9 pr-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="bg-secondary border border-border rounded-lg py-2 px-3 focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Todos los estados</option>
            {Object.entries(statusLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-primary text-white font-semibold flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <RefreshCw className="animate-spin" size={16} />
            ) : (
              "Buscar"
            )}
          </button>
        </form>
        {error && (
          <div className="bg-danger/10 border border-danger/30 text-danger text-sm px-3 py-2 rounded-lg">
            {error}
          </div>
        )}
      </div>

      <div className="glass border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/30">
            <tr>
              {[
                "Socio",
                "Estado",
                "Email",
                "Teléfono",
                "Cuota",
                "Miembro desde",
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {formattedMembers.length === 0 && !loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-muted-foreground"
                >
                  No hay socios registrados
                </td>
              </tr>
            ) : (
              formattedMembers.map((member) => (
                <tr
                  key={member.id}
                  className="border-t border-border/50 hover:bg-muted/40 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground">
                        {member.name}
                      </span>
                      <span className="text-caption text-muted-foreground">
                        Nº {member.memberNumber || "-"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[member.status]}`}
                    >
                      {statusLabels[member.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">{member.email}</td>
                  <td className="px-4 py-3">{member.phone || "-"}</td>
                  <td className="px-4 py-3">{member.monthlyFeeFormatted}</td>
                  <td className="px-4 py-3">{member.memberSinceFormatted}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Página {page} de {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded-lg border border-border disabled:opacity-40"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1 || loading}
          >
            Anterior
          </button>
          <button
            className="px-3 py-1 rounded-lg border border-border disabled:opacity-40"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages || loading}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
