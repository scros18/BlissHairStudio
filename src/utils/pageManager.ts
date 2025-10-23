// Page Manager for Dynamic Content Loading
export class PageManager {
  private contentContainer: HTMLElement | null = null;

  constructor(containerId: string = 'app-content') {
    this.contentContainer = document.getElementById(containerId);
    
    if (!this.contentContainer) {
      console.error(`Content container #${containerId} not found`);
    }
  }

  public loadPage(content: string): void {
    if (!this.contentContainer) return;
    
    // Smooth transition
    this.contentContainer.style.opacity = '0';
    
    setTimeout(() => {
      this.contentContainer!.innerHTML = content;
      this.contentContainer!.style.opacity = '1';
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Dispatch custom event for page change
      window.dispatchEvent(new CustomEvent('page-loaded'));
    }, 150);
  }

  public async loadPageFromTemplate(templateFn: () => string): Promise<void> {
    const content = templateFn();
    this.loadPage(content);
  }
}

export const pageManager = new PageManager();
