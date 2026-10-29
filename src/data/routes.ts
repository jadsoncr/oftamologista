export interface SiteRoute {
  path: string;
  published: boolean;
  title: string;
  description: string;
  blockedReason?: string;
}

/**
 * Páginas independentes ficam fora do ar até haver serviço confirmado.
 * Publicar /consulta ou /exames exige texto próprio e a flag published.
 */
export const SITE_ROUTES: SiteRoute[] = [
  {
    path: '/',
    published: true,
    title: 'Oftalmologista em Copacabana | Dr. Bruno Gomes',
    description:
      'Dr. Bruno Gomes, médico oftalmologista. Consulta clínica, exame de vista e orientação sobre grau e óculos. Atendimento planejado em Copacabana, Rio de Janeiro.',
  },
  {
    path: '/consulta',
    published: false,
    title: 'Consulta oftalmológica',
    description: '',
    blockedReason: 'Aguarda confirmação do médico sobre a consulta oferecida.',
  },
  {
    path: '/exames',
    published: false,
    title: 'Exames oftalmológicos',
    description: '',
    blockedReason: 'Aguarda confirmação dos exames realizados no consultório.',
  },
];

export function normalizePath(pathname: string): string {
  const path = pathname.split('?')[0].split('#')[0];
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1);
  return path || '/';
}

export function isPublishedPath(pathname: string): boolean {
  const path = normalizePath(pathname);
  return SITE_ROUTES.some((route) => route.published && route.path === path);
}

export function publishedPaths(): string[] {
  return SITE_ROUTES.filter((route) => route.published).map((route) => route.path);
}
