// Utility to audit and fix missing alt texts across the application

export interface ImageAuditResult {
  src: string;
  alt: string;
  element: HTMLImageElement;
  hasMissingAlt: boolean;
  suggestions: string[];
}

export class AltTextAuditor {
  private static instance: AltTextAuditor;
  private auditResults: ImageAuditResult[] = [];

  public static getInstance(): AltTextAuditor {
    if (!AltTextAuditor.instance) {
      AltTextAuditor.instance = new AltTextAuditor();
    }
    return AltTextAuditor.instance;
  }

  // Audit all images on the current page
  public auditPage(): ImageAuditResult[] {
    const images = document.querySelectorAll("img");
    this.auditResults = [];

    images.forEach((img) => {
      const result: ImageAuditResult = {
        src: img.src,
        alt: img.alt,
        element: img,
        hasMissingAlt: !img.alt || img.alt.trim() === "",
        suggestions: this.generateAltSuggestions(img),
      };
      this.auditResults.push(result);
    });

    return this.auditResults;
  }

  // Generate alt text suggestions based on context
  private generateAltSuggestions(img: HTMLImageElement): string[] {
    const suggestions: string[] = [];
    const src = img.src.toLowerCase();
    const className = img.className.toLowerCase();
    const parentText = img.parentElement?.textContent?.toLowerCase() || "";

    // Category images
    if (className.includes("category") || parentText.includes("категори")) {
      suggestions.push("Изображение категории товаров НОРДИНЖИНИРИНГ");
    }

    // Product images
    if (
      className.includes("product") ||
      parentText.includes("продукт") ||
      parentText.includes("товар")
    ) {
      suggestions.push("Товар из каталога климатического оборудования");
      suggestions.push("Продукция НОРДИНЖИНИРИНГ");
    }

    // Blog images
    if (
      className.includes("blog") ||
      className.includes("article") ||
      parentText.includes("статья")
    ) {
      suggestions.push("Иллюстрация к статье блога НОРДИНЖИНИРИНГ");
    }

    // Company images
    if (
      className.includes("company") ||
      className.includes("about") ||
      parentText.includes("компан")
    ) {
      suggestions.push("Фотография команды НОРДИНЖИНИРИНГ");
      suggestions.push("Офис компании НОРДИНЖИНИРИНГ");
    }

    // Team member images
    if (
      className.includes("team") ||
      className.includes("member") ||
      parentText.includes("сотрудник")
    ) {
      suggestions.push("Сотрудник компании НОРДИНЖИНИРИНГ");
    }

    // Project images
    if (className.includes("project") || parentText.includes("проект")) {
      suggestions.push("Реализованный проект НОРДИНЖИНИРИНГ");
      suggestions.push("Установленное климатическое оборудование");
    }

    // Logo images
    if (className.includes("logo") || src.includes("logo")) {
      suggestions.push("Логотип НОРДИНЖИНИРИНГ");
    }

    // Partner logos
    if (className.includes("partner") || parentText.includes("партнер")) {
      suggestions.push("Логотип партнера НОРДИНЖИНИРИНГ");
    }

    // Certificate/license images
    if (
      className.includes("certificate") ||
      className.includes("license") ||
      parentText.includes("сертификат") ||
      parentText.includes("лицензи")
    ) {
      suggestions.push("Сертификат или лицензия НОРДИНЖИНИРИНГ");
    }

    // Review avatars
    if (
      className.includes("avatar") ||
      className.includes("review") ||
      parentText.includes("отзыв")
    ) {
      suggestions.push("Аватар автора отзыва");
    }

    // Hero/banner images
    if (className.includes("hero") || className.includes("banner")) {
      suggestions.push("Главное изображение НОРДИНЖИНИРИНГ");
    }

    // Default suggestions if no specific context found
    if (suggestions.length === 0) {
      suggestions.push("Изображение НОРДИНЖИНИРИНГ");
      suggestions.push("Климатическое оборудование");
      suggestions.push("Вентиляционные системы");
    }

    return suggestions;
  }

  // Apply suggested alt text to an image
  public applySuggestion(imageIndex: number, suggestionIndex: number): void {
    const result = this.auditResults[imageIndex];
    if (result && result.suggestions[suggestionIndex]) {
      result.element.alt = result.suggestions[suggestionIndex];
      result.alt = result.suggestions[suggestionIndex];
      result.hasMissingAlt = false;
    }
  }

  // Get audit summary
  public getAuditSummary(): {
    total: number;
    missingAlt: number;
    percentage: number;
  } {
    const total = this.auditResults.length;
    const missingAlt = this.auditResults.filter(
      (result) => result.hasMissingAlt,
    ).length;

    return {
      total,
      missingAlt,
      percentage: total > 0 ? Math.round((missingAlt / total) * 100) : 0,
    };
  }

  // Log audit results to console
  public logResults(): void {
    const summary = this.getAuditSummary();

    console.group("🖼️ Alt Text Audit Results");
    console.log(`Total images: ${summary.total}`);
    console.log(
      `Missing alt text: ${summary.missingAlt} (${summary.percentage}%)`,
    );

    if (summary.missingAlt > 0) {
      console.group("Images with missing alt text:");
      this.auditResults
        .filter((result) => result.hasMissingAlt)
        .forEach((result, index) => {
          console.group(`Image ${index + 1}: ${result.src}`);
          console.log("Suggestions:", result.suggestions);
          console.groupEnd();
        });
      console.groupEnd();
    }

    console.groupEnd();
  }

  // Auto-fix images with best guessed alt text
  public autoFix(): number {
    let fixedCount = 0;

    this.auditResults.forEach((result) => {
      if (result.hasMissingAlt && result.suggestions.length > 0) {
        result.element.alt = result.suggestions[0];
        result.alt = result.suggestions[0];
        result.hasMissingAlt = false;
        fixedCount++;
      }
    });

    return fixedCount;
  }
}

// Global utility functions
export const auditAltTexts = (): ImageAuditResult[] => {
  return AltTextAuditor.getInstance().auditPage();
};

export const logAltTextAudit = (): void => {
  const auditor = AltTextAuditor.getInstance();
  auditor.auditPage();
  auditor.logResults();
};

export const autoFixAltTexts = (): number => {
  const auditor = AltTextAuditor.getInstance();
  auditor.auditPage();
  return auditor.autoFix();
};

// Development helper - run audit automatically in dev mode
if (process.env.NODE_ENV === "development") {
  // Run audit when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(logAltTextAudit, 1000);
    });
  } else {
    setTimeout(logAltTextAudit, 1000);
  }

  // Re-run audit when navigation occurs (for SPAs)
  let currentPath = window.location.pathname;
  const observer = new MutationObserver(() => {
    if (window.location.pathname !== currentPath) {
      currentPath = window.location.pathname;
      setTimeout(logAltTextAudit, 1000);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
