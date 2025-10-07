"use client"

import { Linkedin, Twitter, Facebook, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-semibold mb-4">Information</h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#story" className="text-gray-400 hover:text-white transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#press" className="text-gray-400 hover:text-white transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="#careers" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#3B82F6] bg-clip-text text-transparent">Talrn</h3>
            <ul className="space-y-3">
              <li>
                <a href="#profiles" className="text-gray-400 hover:text-white transition-colors">
                  View iOS Profiles
                </a>
              </li>
              <li>
                <a href="#discover" className="text-gray-400 hover:text-white transition-colors">
                  Discover
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Vendor</h3>
            <ul className="space-y-3">
              <li>
                <a href="#apply" className="text-gray-400 hover:text-white transition-colors">
                  Apply As Vendor
                </a>
              </li>
              <li>
                <a href="#vendor-login" className="text-gray-400 hover:text-white transition-colors">
                  Vendor Login
                </a>
              </li>
              <li>
                <a href="#verified" className="text-gray-400 hover:text-white transition-colors">
                  Get Verified
                </a>
              </li>
              <li>
                <a href="#jobs" className="text-gray-400 hover:text-white transition-colors">
                  Remote Jobs
                </a>
              </li>
              <li>
                <a href="#resources" className="text-gray-400 hover:text-white transition-colors">
                  Resources
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Social</h3>
            <div className="flex gap-4">
              <a href="#linkedin" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#twitter" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#facebook" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#instagram" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2022 - 2025 <span className="font-semibold bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#3B82F6] bg-clip-text text-transparent">Talrn</span> - Labor Omnia Vincit ⚡ by{" "}
            <a href="#cg" className="text-[#5B6EF5] hover:underline">
              CG Advantage
            </a>
          </p>
          <div className="flex gap-6">
            <a href="#terms" className="text-gray-400 hover:text-white transition-colors text-sm">
              Terms of Use
            </a>
            <a href="#privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
