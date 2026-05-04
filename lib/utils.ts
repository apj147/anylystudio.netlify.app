import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const BRAND = {
  gold: '#C9A959',
  sage: '#8B9A7D',
  cream: '#FAF7F2',
  charcoal: '#2C2C2C',
  terracotta: '#C17F59',
} as const

export const SITE = {
  name: 'Anyly Studio',
  tagline: 'Where Your Vision Becomes Art',
  artist: 'April Johnson',
  location: 'Glen Flora, Wisconsin',
  email: 'hello@anylystudio.com',
  url: 'https://anylystudio.com',
} as const
