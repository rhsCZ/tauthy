import { afterEach, describe, expect, it, vi } from 'vitest'

const os = vi.hoisted(() => ({ platform: 'linux' }))
vi.mock('@tauri-apps/plugin-os', () => ({ type: () => Promise.resolve(os.platform) }))

afterEach(() => {
  os.platform = 'linux'
  vi.resetModules()
})

describe('platform light colors', () => {
  it('uses white surfaces and a readable header on macOS', async () => {
    os.platform = 'macos'
    vi.resetModules()
    const { default: light } = await import('./light')

    expect(light.mui.palette.secondary.main).toBe('#ffffff')
    expect(light.mui.palette.secondary.contrastText).toBe(light.mui.palette.text.primary)
    expect(light.mui.palette.background.default).toBe('#ffffff')
    expect(light.mui.palette.background.paper).toBe('#ffffff')
    expect(light.mui.palette.primary.main).toBe('#363636')
  })

  it.each([
    ['linux', '#31363b'],
    ['windows', '#191919'],
  ])('preserves %s colors', async (platform, primary) => {
    os.platform = platform
    vi.resetModules()
    const { default: light } = await import('./light')

    expect(light.mui.palette.secondary.main).toBe(primary)
    expect(light.mui.palette.background.default).toBe('#232629')
  })
})
