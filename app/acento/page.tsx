import { redirect } from "next/navigation"
import { href } from "./_content/site"

export default function AcentoIndex() {
  redirect(href("es"))
}
