import Link from "next/link"
import Image from "next/image"
import { Github, Twitter, Linkedin, Youtube, Facebook, Instagram } from "lucide-react"

export default function EnhancedFooter() {
  return (
    <footer className="relative z-10 border-t border-gray-800 bg-black/40 py-12 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src="/ace-coin-official.jpeg"
                alt="ACE Exchange"
                width={40}
                height={40}
                className="mr-3 rounded-full"
              />
              <span className="text-xl font-bold text-gradient">ACE Exchange</span>
            </div>
            <p className="mb-4 text-gray-400">
              The future of crypto trading. ACE Exchange is revolutionizing the way you trade, invest, and grow your
              digital assets.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                  Exchange
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                  Wallet
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                  Earn
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                  Dreamstate
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                  Governance
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                  API
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                  Status
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                  Risk Disclosure
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500">© {new Date().getFullYear()} ACE Exchange. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
