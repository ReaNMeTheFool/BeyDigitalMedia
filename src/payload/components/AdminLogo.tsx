'use client'

import React from 'react'

export function AdminLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 0' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/beydigital_logo.webp"
        alt="Bey Digital Media"
        style={{
          height: 36,
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
        }}
      />
      <div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: '#e8eaf0',
            lineHeight: 1.2,
            letterSpacing: '-0.2px',
          }}
        >
          Bey Digital Media
        </div>
        <div
          style={{
            fontSize: 10,
            fontWeight: 500,
            color: '#9ca3af',
            lineHeight: 1.2,
            letterSpacing: '0.3px',
            textTransform: 'uppercase',
          }}
        >
          Yönetim Paneli
        </div>
      </div>
    </div>
  )
}
