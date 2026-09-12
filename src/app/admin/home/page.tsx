import {
  getHomePage,
  listFaqs,
  listProjects,
  listServices,
  listTestimonials,
} from "@/lib/content";
import { requireAdmin } from "@/lib/admin-auth";
import {
  saveHomeJsonAction,
  updateAboutAction,
  updateCtaAction,
  updateHeroAction,
  updateHomeBlockAction,
  updateMarqueeAction,
} from "@/app/admin/actions";
import ActionForm from "@/components/admin/ActionForm";
import RepeatableRows from "@/components/admin/RepeatableRows";
import { CheckboxField, TextAreaField, TextField } from "@/components/admin/fields";
import type {
  AboutBlock,
  CtaBlock,
  FaqAccordionBlock,
  HeroBlock,
  MarqueeBlock,
  PageBlock,
  PortfolioSliderBlock,
  ServicesGridBlock,
  TestimonialsCarouselBlock,
} from "@/types/content";

export const metadata = { title: "Ana Sayfa" };

function findBlock<T extends PageBlock>(blocks: PageBlock[], blockType: T["blockType"]) {
  return blocks.find((block): block is T => block.blockType === blockType);
}

/** selectedServices vb. alanlar id veya hidratlanmis nesne olabilir; id kümesini çıkarır. */
function selectedIds(value: (number | { id?: number | null })[] | null | undefined): Set<number> {
  return new Set(
    (value ?? [])
      .map((item) => (typeof item === "number" ? item : item.id))
      .filter((id): id is number => typeof id === "number"),
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="max-w-3xl space-y-4 rounded border border-neutral-200 bg-white p-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">{title}</h2>
      {children}
    </section>
  );
}

function SelectionList({
  label,
  options,
  selected,
}: {
  label: string;
  options: { id: number; title: string }[];
  selected: Set<number>;
}) {
  return (
    <fieldset>
      <legend className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-500">
        {label}
      </legend>
      {options.length === 0 ? (
        <p className="text-sm text-neutral-400">Kayıt yok.</p>
      ) : (
        <div className="grid gap-1 rounded border border-neutral-200 p-3 sm:grid-cols-2">
          {options.map((option) => (
            <label key={option.id} className="flex items-center gap-2 text-sm text-neutral-700">
              <input
                type="checkbox"
                name="selectedIds"
                value={option.id}
                defaultChecked={selected.has(option.id)}
                className="h-4 w-4"
              />
              {option.title}
            </label>
          ))}
        </div>
      )}
    </fieldset>
  );
}

export default async function AdminHomePage() {
  await requireAdmin();

  const [page, services, projects, testimonials, faqs] = await Promise.all([
    getHomePage(),
    listServices(),
    listProjects(),
    listTestimonials(),
    listFaqs(),
  ]);

  if (!page) {
    return (
      <div className="space-y-6">
        <h1 className="text-xl font-semibold">Ana Sayfa</h1>
        <p className="text-sm text-neutral-500">Ana sayfa kaydı bulunamadı.</p>
        <SectionCard title="Gelişmiş: Ham JSON">
          <ActionForm action={saveHomeJsonAction} submitLabel="Blokları oluştur" className="space-y-4">
            <TextAreaField
              label="İçerik (JSON dizisi)"
              name="content"
              rows={16}
              monospace
              defaultValue="[]"
              hint='Her öğe blockType alanına sahip bir nesne olmalıdır. Örnek: [{"blockType":"cta","title":"...","ctaText":"...","ctaLink":"..."}]'
            />
          </ActionForm>
        </SectionCard>
      </div>
    );
  }

  const blocks = page.content ?? [];
  const hero = findBlock<HeroBlock>(blocks, "hero");
  const marquee = findBlock<MarqueeBlock>(blocks, "marquee");
  const servicesGrid = findBlock<ServicesGridBlock>(blocks, "servicesGrid");
  const portfolioSlider = findBlock<PortfolioSliderBlock>(blocks, "portfolioSlider");
  const testimonialsCarousel = findBlock<TestimonialsCarouselBlock>(blocks, "testimonialsCarousel");
  const faqAccordion = findBlock<FaqAccordionBlock>(blocks, "faqAccordion");
  const about = findBlock<AboutBlock>(blocks, "about");
  const cta = findBlock<CtaBlock>(blocks, "cta");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-semibold">Ana Sayfa</h1>
        <p className="text-sm text-neutral-500">Bölümleri tek tek düzenleyin.</p>
      </div>

      <SectionCard title="Hero">
        <ActionForm action={updateHeroAction} submitLabel="Hero'yu kaydet" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Başlık öneki" name="titlePrefix" defaultValue={hero?.icerik?.titlePrefix} />
            <TextField label="Başlık son eki" name="titleSuffix" defaultValue={hero?.icerik?.titleSuffix} />
          </div>
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-500">
              Animasyonlu kelimeler
            </p>
            <RepeatableRows
              name="words"
              addLabel="Kelime ekle"
              initialRows={hero?.icerik?.animatedWords ?? []}
              fields={[{ key: "word", label: "Kelime" }]}
            />
          </div>
          <TextAreaField label="Alt metin" name="subtitle" defaultValue={hero?.icerik?.subtitle} rows={3} />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Birincil CTA metni" name="primaryCtaText" defaultValue={hero?.cta?.primaryCta?.text} />
            <TextField label="Birincil CTA bağlantısı" name="primaryCtaLink" defaultValue={hero?.cta?.primaryCta?.link} />
            <TextField label="İkincil CTA metni" name="secondaryCtaText" defaultValue={hero?.cta?.secondaryCta?.text} />
            <TextField label="İkincil CTA bağlantısı" name="secondaryCtaLink" defaultValue={hero?.cta?.secondaryCta?.link} />
          </div>
        </ActionForm>
      </SectionCard>

      <SectionCard title="Kayan Şerit">
        <ActionForm action={updateMarqueeAction} submitLabel="Şeridi kaydet" className="space-y-4">
          <RepeatableRows
            name="items"
            addLabel="Öğe ekle"
            initialRows={marquee?.items ?? []}
            fields={[{ key: "text", label: "Metin" }]}
          />
        </ActionForm>
      </SectionCard>

      <SectionCard title="CTA">
        <ActionForm action={updateCtaAction} submitLabel="CTA'yı kaydet" className="space-y-4">
          <TextField label="CTA başlığı" name="title" defaultValue={cta?.title} required />
          <TextAreaField label="CTA alt metni" name="subtitle" defaultValue={cta?.subtitle} rows={2} />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Düğme metni" name="ctaText" defaultValue={cta?.ctaText} required />
            <TextField label="Düğme bağlantısı" name="ctaLink" defaultValue={cta?.ctaLink} required />
          </div>
        </ActionForm>
      </SectionCard>

      <SectionCard title="Hakkımızda">
        <ActionForm action={updateAboutAction} submitLabel="Hakkımızda'yı kaydet" className="space-y-4">
          <TextField label="Hakkımızda başlığı" name="title" defaultValue={about?.title} />
          <TextAreaField label="Paragraf" name="content" defaultValue={about?.content} rows={5} />
        </ActionForm>
      </SectionCard>

      <SectionCard title="Hizmetler Bloğu">
        <ActionForm action={updateHomeBlockAction} submitLabel="Bloğu kaydet" className="space-y-4">
          <input type="hidden" name="blockType" value="servicesGrid" />
          <TextField label="Bölüm başlığı" name="sectionTitle" defaultValue={servicesGrid?.sectionTitle} />
          <CheckboxField
            label="Tüm hizmetleri göster"
            name="showAll"
            defaultChecked={Boolean(servicesGrid?.showAllServices)}
          />
          <SelectionList
            label="Seçili hizmetler (showAll kapalıysa kullanılır)"
            options={services.map((service) => ({ id: service.id, title: service.title }))}
            selected={selectedIds(servicesGrid?.selectedServices)}
          />
        </ActionForm>
      </SectionCard>

      <SectionCard title="Portfolyo Bloğu">
        <ActionForm action={updateHomeBlockAction} submitLabel="Bloğu kaydet" className="space-y-4">
          <input type="hidden" name="blockType" value="portfolioSlider" />
          <TextField label="Portfolyo başlığı" name="title" defaultValue={portfolioSlider?.title} required />
          <TextAreaField label="Portfolyo alt metni" name="subtitle" defaultValue={portfolioSlider?.subtitle} rows={2} />
          <CheckboxField
            label="Tüm projeleri göster"
            name="showAll"
            defaultChecked={portfolioSlider?.showAllPortfolios !== false}
          />
          <SelectionList
            label="Seçili projeler (showAll kapalıysa kullanılır)"
            options={projects.map((project) => ({ id: project.id, title: project.title }))}
            selected={selectedIds(portfolioSlider?.selectedPortfolios)}
          />
        </ActionForm>
      </SectionCard>

      <SectionCard title="Referanslar Bloğu">
        <ActionForm action={updateHomeBlockAction} submitLabel="Bloğu kaydet" className="space-y-4">
          <input type="hidden" name="blockType" value="testimonialsCarousel" />
          <TextField label="Referanslar başlığı" name="title" defaultValue={testimonialsCarousel?.title} required />
          <CheckboxField
            label="Tüm referansları göster"
            name="showAll"
            defaultChecked={testimonialsCarousel?.showAllTestimonials !== false}
          />
          <SelectionList
            label="Seçili referanslar (showAll kapalıysa kullanılır)"
            options={testimonials.map((testimonial) => ({
              id: testimonial.id,
              title: `${testimonial.name} — ${testimonial.company}`,
            }))}
            selected={selectedIds(testimonialsCarousel?.selectedTestimonials)}
          />
        </ActionForm>
      </SectionCard>

      <SectionCard title="SSS Bloğu">
        <ActionForm action={updateHomeBlockAction} submitLabel="Bloğu kaydet" className="space-y-4">
          <input type="hidden" name="blockType" value="faqAccordion" />
          <TextField label="SSS başlığı" name="title" defaultValue={faqAccordion?.title} required />
          <TextAreaField label="SSS alt metni" name="subtitle" defaultValue={faqAccordion?.subtitle} rows={2} />
          <CheckboxField
            label="Tüm soruları göster"
            name="showAll"
            defaultChecked={Boolean(faqAccordion?.showAllFaqs)}
          />
          <SelectionList
            label="Seçili sorular (showAll kapalıysa kullanılır)"
            options={faqs.map((faq) => ({ id: faq.id, title: faq.question }))}
            selected={selectedIds(faqAccordion?.selectedFaqs)}
          />
        </ActionForm>
      </SectionCard>

      <SectionCard title="Gelişmiş: Ham JSON">
        <ActionForm action={saveHomeJsonAction} submitLabel="Blokları değiştir" className="space-y-4">
          <TextAreaField
            label="İçerik (JSON dizisi)"
            name="content"
            rows={16}
            monospace
            defaultValue={JSON.stringify(blocks, null, 2)}
            hint="Kaydetmek içeriğin tamamını buradaki diziyle değiştirir. Blok sırasını da buradan yönetebilirsiniz."
          />
        </ActionForm>
      </SectionCard>
    </div>
  );
}
