import type { Block } from "payload";

export const ServicesGridBlock: Block = {
  slug: "servicesGrid",
  fields: [
    {
      name: "sectionTitle",
      type: "text",
      label: "Bölüm Başlığı",
      defaultValue: "Hizmetlerimiz",
    },
    {
      name: "showAllServices",
      type: "checkbox",
      label: "Tüm Servisleri Göster",
      defaultValue: true,
    },
    {
      name: "selectedServices",
      type: "relationship",
      relationTo: "services",
      hasMany: true,
      label: "Seçili Servisler",
      admin: {
        condition: (data, siblingData) => !siblingData.showAllServices,
      },
    },
  ],
};
