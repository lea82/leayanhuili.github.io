# LLM Evaluation Framework

**Status:** Active development  
**Tags:** evaluation, LLM, benchmarking, reliability

## Overview

A structured benchmarking tool for measuring reliability, consistency, and regression across Claude and GPT model versions.

## Goals

- Provide reproducible evaluation results across model updates
- Support custom dataset ingestion (JSONL format)
- Track per-prompt regression over time
- Integrate into CI/CD pipelines

## Tech Stack

- Python 3.11+
- Claude API (Anthropic SDK)
- OpenAI API
- Pandas for dataset handling
- JSON/JSONL evaluation datasets

## Getting Started

```bash
git clone https://github.com/lea82/llm-evaluation-framework
cd llm-evaluation-framework
pip install -r requirements.txt
python run_eval.py --dataset data/test.jsonl --model claude-3-5-sonnet
```

## Metrics

- Accuracy (exact match, semantic similarity)
- Hallucination rate
- Latency (p50, p95)
- Output consistency (same prompt, multiple runs)

## Roadmap

- [ ] Dataset versioning
- [ ] Model diff reporting
- [ ] Hallucination detection module
- [ ] CI/CD GitHub Action
