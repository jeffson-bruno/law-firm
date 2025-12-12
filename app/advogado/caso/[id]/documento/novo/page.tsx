"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Save,
  Printer,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function NovoDocumentoPage({ params }: { params: { id: string } }) {
  const [documentType, setDocumentType] = useState("")
  const [fontSize, setFontSize] = useState("12")
  const [alignment, setAlignment] = useState("justify")
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Documento salvo",
      description: "O documento foi salvo com sucesso.",
    })
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/advogado/caso/${params.id}`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-balance">Gerador de Documentos</h1>
          <p className="text-muted-foreground text-pretty">Crie documentos jurídicos profissionais</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configurações do Documento</CardTitle>
          <CardDescription>Selecione o tipo e formato do documento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="docType">Tipo de Documento</Label>
              <Select value={documentType} onValueChange={setDocumentType}>
                <SelectTrigger id="docType">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="procuracao">Procuração</SelectItem>
                  <SelectItem value="hipossuficiencia">Declaração de Hipossuficiência</SelectItem>
                  <SelectItem value="honorarios">Contrato de Honorários</SelectItem>
                  <SelectItem value="peticao">Petição</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fontSize">Tamanho da Fonte</Label>
              <Select value={fontSize} onValueChange={setFontSize}>
                <SelectTrigger id="fontSize">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10pt</SelectItem>
                  <SelectItem value="11">11pt</SelectItem>
                  <SelectItem value="12">12pt</SelectItem>
                  <SelectItem value="14">14pt</SelectItem>
                  <SelectItem value="16">16pt</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Fonte</Label>
              <Select defaultValue="arial">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arial">Arial</SelectItem>
                  <SelectItem value="times">Times New Roman</SelectItem>
                  <SelectItem value="calibri">Calibri</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Editor de Texto</CardTitle>
          <CardDescription>Utilize as ferramentas de formatação para criar seu documento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2 p-2 border-b">
            <Button variant="outline" size="sm" className="bg-transparent">
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Italic className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Underline className="h-4 w-4" />
            </Button>
            <div className="w-px h-6 bg-border mx-2" />
            <Button variant="outline" size="sm" className="bg-transparent" onClick={() => setAlignment("left")}>
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent" onClick={() => setAlignment("center")}>
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent" onClick={() => setAlignment("right")}>
              <AlignRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent" onClick={() => setAlignment("justify")}>
              <AlignJustify className="h-4 w-4" />
            </Button>
          </div>

          <div
            className="min-h-96 p-6 border rounded-lg bg-card"
            contentEditable
            style={{
              fontSize: `${fontSize}pt`,
              textAlign: alignment as any,
              lineHeight: "1.6",
            }}
          >
            <p className="text-foreground">
              Digite seu documento aqui ou use um modelo pré-definido conforme o tipo selecionado...
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
