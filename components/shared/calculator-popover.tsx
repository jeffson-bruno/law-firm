"use client"

import { useState } from "react"
import { Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function CalculatorPopover() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.")
      setWaitingForOperand(false)
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".")
    }
  }

  const clear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      let newValue = currentValue

      switch (operation) {
        case "+":
          newValue = currentValue + inputValue
          break
        case "-":
          newValue = currentValue - inputValue
          break
        case "×":
          newValue = currentValue * inputValue
          break
        case "÷":
          newValue = currentValue / inputValue
          break
        case "=":
          newValue = inputValue
          break
      }

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const buttons = [
    ["7", "8", "9", "÷"],
    ["4", "5", "6", "×"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
  ]

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="w-full justify-start gap-3">
          <Calculator className="h-4 w-4" />
          Calculadora
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4" side="right" align="start">
        <div className="space-y-3">
          <div className="bg-secondary rounded-md p-4 text-right">
            <div className="text-2xl font-mono font-semibold text-foreground break-all">{display}</div>
          </div>

          <div className="space-y-2">
            {buttons.map((row, i) => (
              <div key={i} className="grid grid-cols-4 gap-2">
                {row.map((btn) => (
                  <Button
                    key={btn}
                    variant={["÷", "×", "-", "+", "="].includes(btn) ? "default" : "outline"}
                    className="h-12 text-lg font-medium"
                    onClick={() => {
                      if (btn === ".") {
                        inputDecimal()
                      } else if (["+", "-", "×", "÷", "="].includes(btn)) {
                        performOperation(btn)
                      } else {
                        inputDigit(btn)
                      }
                    }}
                  >
                    {btn}
                  </Button>
                ))}
              </div>
            ))}
            <Button variant="secondary" className="w-full h-12" onClick={clear}>
              Limpar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
