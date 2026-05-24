import type { Block } from "payload";

export const ServicesGridBlock: Block = {
  slug: "servicesGrid",
  interfaceName: "ServicesGridBlock",
  fields: [
    {
      name: "sectionTitle",
      type: "text",
      label: "Bölüm Başlığı",
      admin: { description: "Bölüm başlığı" },
      defaultValue: "Hizmetlerimiz",
    },
    {
      name: "showAllServices",
      type: "checkbox",
      label: "Tüm Servisleri Göster",
      admin: { description: "Tümünü otomatik getir" },
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
        description: "Manuel servis seçimi",
      },
    },
  ],
};
