import { getFooter, getNavigation, getSiteSettings, listMedia } from "@/lib/content";
import { requireAdmin } from "@/lib/admin-auth";
import {
  saveFooterAction,
  saveNavigationAction,
  saveSiteSettingsAction,
} from "@/app/admin/actions";
import ActionForm from "@/components/admin/ActionForm";
import RepeatableRows from "@/components/admin/RepeatableRows";
import { SelectField, TextAreaField, TextField } from "@/components/admin/fields";

export const metadata = { title: "Site Ayarları" };

export default async function AdminSettingsPage() {
  await requireAdmin();

  const [settings, navigation, footer, media] = await Promise.all([
    getSiteSettings(),
    getNavigation(),
    getFooter(),
    listMedia(),
  ]);

  const mediaOptions = media.map((item) => ({ value: String(item.id), label: item.filename }));

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-semibold">Site Ayarları</h1>

      <section className="max-w-3xl space-y-4 rounded border border-neutral-200 bg-white p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Site Bilgileri
        </h2>
        <ActionForm action={saveSiteSettingsAction} submitLabel="Kaydet" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Site adı" name="siteName" defaultValue={settings.siteName} />
            <TextField label="Slogan" name="tagline" defaultValue={settings.tagline} />
            <TextField label="İletişim e-postası" name="contactEmail" type="text" defaultValue={settings.contactEmail} />
            <TextField label="İletişim telefonu" name="contactPhone" defaultValue={settings.contactPhone} />
            <TextField label="Varsayılan meta başlık" name="defaultMetaTitle" defaultValue={settings.defaultMetaTitle} />
            <TextField
              label="Varsayılan meta açıklama"
              name="defaultMetaDescription"
              defaultValue={settings.defaultMetaDescription}
            />
          </div>
          <TextField
            label="Google doğrulama kodu"
            name="googleVerification"
            defaultValue={settings.googleVerification}
            hint="Search Console meta doğrulaması."
          />
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-500">
              Sosyal bağlantılar
            </p>
            <RepeatableRows
              name="social"
              addLabel="Bağlantı ekle"
              initialRows={settings.socialLinks ?? []}
              fields={[
                { key: "platform", label: "Platform" },
                { key: "url", label: "Adres" },
              ]}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Logo"
              name="logoMediaId"
              defaultValue={settings.logo?.id ?? ""}
              options={mediaOptions}
              emptyLabel="— yok —"
            />
            <SelectField
              label="Favicon"
              name="faviconMediaId"
              defaultValue={settings.favicon?.id ?? ""}
              options={mediaOptions}
              emptyLabel="— yok —"
            />
          </div>
        </ActionForm>
      </section>

      <section className="max-w-3xl space-y-4 rounded border border-neutral-200 bg-white p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">Navigasyon</h2>
        <ActionForm action={saveNavigationAction} submitLabel="Kaydet" className="space-y-4">
          <RepeatableRows
            name="links"
            addLabel="Bağlantı ekle"
            initialRows={navigation.links ?? []}
            fields={[
              { key: "label", label: "Etiket" },
              { key: "href", label: "Adres" },
              { key: "children", label: "Alt bağlantılar (JSON)", type: "json", placeholder: "[]" },
            ]}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="CTA etiketi" name="ctaLabel" defaultValue={navigation.ctaLabel} />
            <TextField label="CTA adresi" name="ctaHref" defaultValue={navigation.ctaHref} />
          </div>
        </ActionForm>
      </section>

      <section className="max-w-3xl space-y-4 rounded border border-neutral-200 bg-white p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">Alt Bilgi (Footer)</h2>
        <ActionForm action={saveFooterAction} submitLabel="Kaydet" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="CTA başlığı" name="ctaTitle" defaultValue={footer.ctaTitle} />
            <TextField label="CTA düğme metni" name="ctaButtonText" defaultValue={footer.ctaButtonText} />
          </div>
          <TextAreaField label="CTA alt metni" name="ctaSubtitle" defaultValue={footer.ctaSubtitle} rows={2} />
          <RepeatableRows
            name="columns"
            addLabel="Sütun ekle"
            initialRows={footer.columns ?? []}
            fields={[
              { key: "title", label: "Sütun başlığı" },
              { key: "links", label: "Bağlantılar (JSON)", type: "json", placeholder: "[]" },
            ]}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Alt metin" name="bottomText" defaultValue={footer.bottomText} />
            <TextField label="Marka sloganı" name="brandTagline" defaultValue={footer.brandTagline} />
          </div>
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-500">
              Sosyal bağlantılar
            </p>
            <RepeatableRows
              name="social"
              addLabel="Bağlantı ekle"
              initialRows={footer.socialLinks ?? []}
              fields={[
                { key: "platform", label: "Platform" },
                { key: "url", label: "Adres" },
              ]}
            />
          </div>
        </ActionForm>
      </section>
    </div>
  );
}
