// Simple SPA Router
export class Router {
  private routes: Map<string, () => void> = new Map();
  private notFoundHandler: (() => void) | null = null;

  constructor() {
    window.addEventListener('popstate', () => this.handleRoute());
    
    // Intercept all link clicks
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href && this.isSameOrigin(link.href)) {
        const url = new URL(link.href);
        
        // Don't intercept external links or links with target="_blank"
        if (link.target === '_blank' || !this.isSameOrigin(link.href)) {
          return;
        }
        
        // Prevent default and handle with router
        e.preventDefault();
        this.navigate(url.pathname);
      }
    });
  }

  private isSameOrigin(href: string): boolean {
    const url = new URL(href, window.location.origin);
    return url.origin === window.location.origin;
  }

  public route(path: string, handler: () => void): Router {
    this.routes.set(path, handler);
    return this;
  }

  public notFound(handler: () => void): Router {
    this.notFoundHandler = handler;
    return this;
  }

  public navigate(path: string): void {
    window.history.pushState({}, '', path);
    this.handleRoute();
  }

  private handleRoute(): void {
    const path = window.location.pathname;
    
    // Try exact match first
    if (this.routes.has(path)) {
      this.routes.get(path)!();
      return;
    }
    
    // Try pattern matching for dynamic routes
    for (const [routePath, handler] of this.routes.entries()) {
      if (this.matchRoute(routePath, path)) {
        handler();
        return;
      }
    }
    
    // No match found
    if (this.notFoundHandler) {
      this.notFoundHandler();
    }
  }

  private matchRoute(routePath: string, actualPath: string): boolean {
    // Simple pattern matching for routes like /products/:id
    const routeParts = routePath.split('/');
    const pathParts = actualPath.split('/');
    
    if (routeParts.length !== pathParts.length) {
      return false;
    }
    
    return routeParts.every((part, i) => {
      return part.startsWith(':') || part === pathParts[i];
    });
  }

  public start(): void {
    this.handleRoute();
  }

  public getParam(name: string): string | null {
    const path = window.location.pathname;
    const parts = path.split('/');
    
    // Simple param extraction (extend as needed)
    const paramIndex = parts.findIndex(p => p === name);
    return paramIndex >= 0 && paramIndex < parts.length - 1 ? parts[paramIndex + 1] : null;
  }
}

export const router = new Router();
