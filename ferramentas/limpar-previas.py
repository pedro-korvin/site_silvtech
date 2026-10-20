#!/usr/bin/env python3
"""
Remove prévias com mais de N dias (padrão 30) de provedores/previas/
e do registro ferramentas/previas.json.

Uso: python3 ferramentas/limpar-previas.py [dias]
Imprime os códigos removidos (um por linha).
"""
import json
import shutil
import sys
from datetime import date, timedelta
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
PREVIAS = RAIZ / "provedores" / "previas"
REGISTRO = RAIZ / "ferramentas" / "previas.json"

dias = int(sys.argv[1]) if len(sys.argv) > 1 else 30
limite = date.today() - timedelta(days=dias)
reg = json.loads(REGISTRO.read_text(encoding="utf-8")) if REGISTRO.exists() else []
manter = []
for item in reg:
    if date.fromisoformat(item["criada_em"]) < limite:
        pasta = PREVIAS / item["codigo"]
        if pasta.exists():
            shutil.rmtree(pasta)
        print(item["codigo"])
    else:
        manter.append(item)
REGISTRO.write_text(json.dumps(manter, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
