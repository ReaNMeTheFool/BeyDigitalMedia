'use client'

import { useEffect } from 'react'

export function PasswordToggle() {
  useEffect(() => {
    // Payload login formundaki şifre input'unu bul
    const passwordInput = document.querySelector(
      'input[type="password"]'
    ) as HTMLInputElement | null

    if (!passwordInput) return

    const wrapper = passwordInput.parentElement
    if (!wrapper) return

    // Zaten eklenmiş mi kontrol et
    if (wrapper.querySelector('.pwd-toggle-btn')) return

    // Wrapper'ı relative yap ve flex ile hizala
    wrapper.style.position = 'relative'

    // Toggle butonu oluştur
    const toggleBtn = document.createElement('button')
    toggleBtn.type = 'button'
    toggleBtn.className = 'pwd-toggle-btn'
    toggleBtn.setAttribute('aria-label', 'Şifreyi göster')
    toggleBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    `
    toggleBtn.style.cssText = `
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background: transparent;
      border: none;
      cursor: pointer;
      color: #9ca3af;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px;
      border-radius: 6px;
      transition: all 150ms ease;
      z-index: 2;
    `

    // Hover efekti
    toggleBtn.addEventListener('mouseenter', () => {
      toggleBtn.style.color = '#e8eaf0'
      toggleBtn.style.background = 'rgba(255,255,255,0.05)'
    })
    toggleBtn.addEventListener('mouseleave', () => {
      toggleBtn.style.color = '#9ca3af'
      toggleBtn.style.background = 'transparent'
    })

    // Toggle fonksiyonu
    let visible = false
    toggleBtn.addEventListener('click', () => {
      visible = !visible
      passwordInput.type = visible ? 'text' : 'password'
      toggleBtn.setAttribute('aria-label', visible ? 'Şifreyi gizle' : 'Şifreyi göster')
      toggleBtn.innerHTML = visible
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
            <line x1="2" x2="22" y1="2" y2="22"/>
          </svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>`
    })

    wrapper.appendChild(toggleBtn)

    // Cleanup
    return () => {
      toggleBtn.remove()
    }
  }, [])

  return null
}
