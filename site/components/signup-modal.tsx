"use client"

import { useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface SignupModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SignupModal({ open, onOpenChange }: SignupModalProps) {
  // Load Mailchimp validation script when the modal is opened
  useEffect(() => {
    if (open) {
      const script = document.createElement("script")
      script.src = "//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"
      script.async = true

      script.onload = () => {
        // Initialize Mailchimp validation
        if (window.jQuery) {
          const $ = window.jQuery
          window.fnames = new Array()
          window.ftypes = new Array()
          window.fnames[0] = "EMAIL"
          window.ftypes[0] = "email"
          window.fnames[1] = "FNAME"
          window.ftypes[1] = "text"
          window.fnames[2] = "LNAME"
          window.ftypes[2] = "text"
          window.fnames[3] = "ADDRESS"
          window.ftypes[3] = "address"
          window.fnames[4] = "PHONE"
          window.ftypes[4] = "phone"
          window.fnames[5] = "BIRTHDAY"
          window.ftypes[5] = "birthday"
          window.fnames[6] = "COMPANY"
          window.ftypes[6] = "text"
        }
      }

      document.body.appendChild(script)

      return () => {
        document.body.removeChild(script)
      }
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Conectá tu Tienda Nube</DialogTitle>
          <DialogDescription className="text-center">
            Dejanos tus datos y te contactaremos para ayudarte a comenzar
          </DialogDescription>
        </DialogHeader>

        <div id="mc_embed_signup" className="w-full max-w-[600px] mx-auto">
          <form
            action="https://jigxo.us10.list-manage.com/subscribe/post?u=a51aa597bdc5fb0cb4c5dea59&amp;id=12d26060b4&amp;f_id=00b7c3e5f0"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_blank"
          >
            <div id="mc_embed_signup_scroll">
              <div className="indicates-required mb-4">
                <span className="asterisk">*</span> indica campo requerido
              </div>
              <div className="mc-field-group mb-4">
                <label htmlFor="mce-EMAIL" className="block mb-2">
                  Email <span className="asterisk">*</span>
                </label>
                <input
                  type="email"
                  name="EMAIL"
                  className="required email w-full p-2 border border-gray-300 rounded"
                  id="mce-EMAIL"
                  required
                />
              </div>
              <div id="mce-responses" className="clear foot">
                <div className="response" id="mce-error-response" style={{ display: "none" }}></div>
                <div className="response" id="mce-success-response" style={{ display: "none" }}></div>
              </div>
              <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
                {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
                <input type="text" name="b_a51aa597bdc5fb0cb4c5dea59_12d26060b4" tabIndex={-1} defaultValue="" />
              </div>
              <div className="optionalParent">
                <div className="clear foot">
                  <input
                    type="submit"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    className="button bg-[#6c5ce7] hover:bg-[#5b4bc7] text-white px-8 py-3 rounded-md w-full cursor-pointer"
                    value="Suscribirse"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

