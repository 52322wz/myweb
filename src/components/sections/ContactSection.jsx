const BASE = import.meta.env.BASE_URL

export default function ContactSection() {
  return (
    <section className="px-6 md:px-10 py-8 border-t border-black/5 dark:border-white/10">
      {/* Avatar */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500
                        flex items-center justify-center text-white text-xl font-semibold
                        shadow-md shadow-blue-500/20 flex-shrink-0">
          王
        </div>
        <div>
          <h3 className="text-base font-semibold text-black dark:text-white">
            自由的小王
          </h3>
          <p className="text-sm text-black/40 dark:text-white/40">
            放假的大二学生
          </p>
        </div>
      </div>

      {/* Contact */}
      <h2 className="text-xs font-semibold tracking-widest uppercase text-black/30 dark:text-white/30 mb-5">
        联系我
      </h2>

      <div className="space-y-4">
        {/* GitHub */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3.5 p-3.5 rounded-2xl
                     bg-white dark:bg-[#1c1c1e]
                     border border-black/5 dark:border-white/10
                     hover:border-black/10 dark:hover:border-white/20
                     shadow-sm hover:shadow-md
                     transition-all duration-200 group/github"
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0
                          group-hover/github:scale-105 transition-transform">
            <img src={`${BASE}images/icons/github.jpg`} alt="GitHub" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-medium text-black dark:text-white">GitHub</p>
            <p className="text-xs text-black/40 dark:text-white/40">查看我的开源项目</p>
          </div>
        </a>

        {/* QQ */}
        <div className="group/qq rounded-2xl bg-white dark:bg-[#1c1c1e]
                        border border-black/5 dark:border-white/10
                        shadow-sm hover:shadow-md transition-shadow overflow-hidden">
          <div className="flex items-center gap-3.5 p-3.5 cursor-pointer">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
              <img src={`${BASE}images/icons/qq.jpg`} alt="QQ" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-medium text-black dark:text-white">QQ</p>
              <p className="text-xs text-black/40 dark:text-white/40">扫码添加好友</p>
            </div>
            <div className="ml-auto hidden lg:block text-black/20 dark:text-white/20
                            group-hover/qq:rotate-90 transition-transform duration-300">
              <svg width="12" height="12" viewBox="0 0 12 12">
                <path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          {/* QR: desktop hover to show, mobile always show */}
          <div className="overflow-hidden transition-all duration-300 ease-out
                          lg:max-h-0 lg:group-hover/qq:max-h-[500px]
                          max-lg:max-h-[500px]">
            <div className="px-3.5 pb-4">
              <img src={`${BASE}images/qr/qq.jpg`} alt="QQ 二维码" className="w-full rounded-xl bg-white" />
            </div>
          </div>
        </div>

        {/* WeChat */}
        <div className="group/wx rounded-2xl bg-white dark:bg-[#1c1c1e]
                        border border-black/5 dark:border-white/10
                        shadow-sm hover:shadow-md transition-shadow overflow-hidden">
          <div className="flex items-center gap-3.5 p-3.5 cursor-pointer">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
              <img src={`${BASE}images/icons/wechat.jpg`} alt="微信" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-medium text-black dark:text-white">微信</p>
              <p className="text-xs text-black/40 dark:text-white/40">扫码添加好友</p>
            </div>
            <div className="ml-auto hidden lg:block text-black/20 dark:text-white/20
                            group-hover/wx:rotate-90 transition-transform duration-300">
              <svg width="12" height="12" viewBox="0 0 12 12">
                <path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          {/* QR: desktop hover to show, mobile always show */}
          <div className="overflow-hidden transition-all duration-300 ease-out
                          lg:max-h-0 lg:group-hover/wx:max-h-[500px]
                          max-lg:max-h-[500px]">
            <div className="px-3.5 pb-4">
              <img src={`${BASE}images/qr/wechat.jpg`} alt="微信二维码" className="w-full rounded-xl bg-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
