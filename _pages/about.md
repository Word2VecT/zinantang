---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "<https://cdn.jsdelivr.net/gh/>" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "<https://raw.githubusercontent.com/>" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>

Zinan Tang (唐梓楠 in Chinese) is currently pursuing his master's degree in Electronic and Information Engineering (EIE) at the [Department of Automation (DA)](https://www.au.tsinghua.edu.cn), [Tsinghua University (THU)](https://www.tsinghua.edu.cn), under the supervision of [Dr. Biqing Huang](https://www.au.tsinghua.edu.cn/info/1075/3209.htm). He received his B.S. degree in Computer Science (CS) from the [School of Computer Science (Pilot Software Engineering School, SCS)](https://scs.bupt.edu.cn/) at [Beijing University of Posts and Telecommunication (BUPT)](https://www.bupt.edu.cn/). He currently is a Research Intern (RI) of [Ant Group](https://www.antgroup.com), participating in training data optimization for the [Ant Ling AI Model Family](https://www.ant-ling.com).

His research interests are on **Data-centric LLMs** (e.g., AI4data, data4AI, SFT, post-training, pre-training, reasoning).

# 🔥 News

- *2026.07*: 🔥🔥 [CausalMix](https://arxiv.org/abs/2607.01104) is released on arXiv!
- *2026.04*: 🎉🎉 [REST](https://arXiv.org/abs/2507.10541) is accepted by ACL 2026 (Main). Congrats to Zhuoshi Pan!
- *2025.12*: 🔥🔥 The [technical report](https://arXiv.org/abs/2512.14051) of [OpenDataArena](https://opendataarena.github.io/) is on arXiv!
- *2025.09*: 🔥🔥 [ScaleDiff](https://arXiv.org/abs/2509.21070) is released on arXiv!
- *2025.08*: 🎉🎉 [Middo](https://arXiv.org/abs/2508.21589) is accepted by EMNLP 2025 (Main). Thanks for all collaborators!

# 📝 Publications

## ✋ (Co) First-authored Publications

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">arXiv 2026</div><img src='images/CausalMix.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[CausalMix: Data Mixture as Causal Inference for Language Model Training](https://arxiv.org/abs/2607.01104) \\
**Zinan Tang**, **Yukun Zhang**, Shaomian Zheng, Zhuoshi Pan, Qizhi Pei, Dingnan Jin, Jun Zhou, Yujun Wang, Biqing Huang
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">EMNLP 2025 (Main)</div><img src='images/Middo.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[Middo: Model-Informed Dynamic Data Optimization for Enhanced LLM Fine-Tuning via Closed-Loop Learning](https://aclanthology.org/2025.emnlp-main.350) \\
**Zinan Tang**, Xin Gao, Zhuoshi Pan, Qizhi Pei, Mengzhang Cai, Jiang Wu, Conghui He, Lijun Wu

[**Project**](https://github.com/Word2VecT/Middo) \| [![](https://img.shields.io/github/stars/Word2VecT/Middo?style=social&label=Code+Stars)](https://github.com/Word2VecT/Middo) \| [![Hugging Face](https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-blue)](https://huggingface.co/collections/Word2Li/middo-68c27d3b42f79febf7f6312c)
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">ACL 2025 (Workshop GEM$^2$)</div><img src='images/MTRBanch.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

MTRBench: A Multimodal Reasoning Benchmark from Reality Shows (fka. [Big Escape Benchmark: Evaluating Human-Like Reasoning in Language Models via Real-World Escape Room Challenges](https://aclanthology.org/2025.gem-1.42)) \\
**Zinan Tang**, **QiYao Sun**, Zhuoshi Pan, Qizhi Pei, Xin Gao, Mengyuan Sun, Honglin Lin, Mengzhang Cai, Yu Li, Chenlin Ming, Jiang Wu, Conghui He, Lijun Wu
</div>
</div>

## 📰 Technical Reports

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">arXiv 2025</div><img src='images/ODA.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[OpenDataArena: A Fair and Open Arena for Benchmarking Post-Training Dataset Value](https://arXiv.org/abs/2512.14051) \\
Mengzhang Cai, Xin Gao, Yu Li, Honglin Lin, Zheng Liu, Zhuoshi Pan, Qizhi Pei, Xiaoran Shang, Mengyuan Sun, **Zinan Tang**, Xiaoyang Wang, Zhanping Zhong, Yun Zhu, Dahua Lin, Conghui He, Lijun Wu

[**Project**](https://opendataarena.github.io) \| [![](https://img.shields.io/github/stars/OpenDataArena/OpenDataArena-Tool?style=social&label=Code+Stars)](https://github.com/OpenDataArena/OpenDataArena-Tool) \| [![Hugging Face](https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-blue)](https://huggingface.co/OpenDataArena)
</div>
</div>

## 🤝 Co-authored Publications

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">ACL 2026 (Main)</div><img src='images/RESTv2.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[REST: Stress Testing Large Reasoning Models by Asking Multiple Problems at Once](https://arXiv.org/abs/2507.10541) \\
Zhuoshi Pan, Qizhi Pei, Yu Li, **Zinan Tang**, Qiyao Sun, H. Vicky Zhao, Conghui He, Lijun Wu

[**Project**](https://github.com/opendatalab/REST) \| [![](https://img.shields.io/github/stars/opendatalab/REST?style=social&label=Code+Stars)](https://github.com/opendatalab/REST)
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">arXiv 2025</div><img src='images/scalediff.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[ScaleDiff: Scaling Difficult Problems for Advanced Mathematical Reasoning](https://arXiv.org/abs/2509.21070) \\
Qizhi Pei, Zhuoshi Pan, Honglin Lin, Xin Gao, Yu Li, **Zinan Tang**, Conghui He, Rui Yan, Lijun Wu

[**Project**](https://github.com/QizhiPei/ScaleDiff) \| [![](https://img.shields.io/github/stars/QizhiPei/ScaleDiff?style=social&label=Code+Stars)](https://arXiv.org/abs/2509.21070) \| [![Hugging Face](https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-blue)](https://huggingface.co/collections/QizhiPei/scalediff-68a71cc18839c1cc1471187e)
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">ACL 2025 (Main)</div><img src='images/gra.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[David's Slingshot: A Strategic Coordination Framework of Small LLMs Matches Large LLMs in Data Synthesis](https://arXiv.org/abs/2504.12322) \\
Xin Gao, Qizhi Pei, **Zinan Tang**, Yu Li, Honglin Lin, Jiang Wu, Lijun Wu, Conghui He

[**Project**](https://github.com/GX-XinGao/GRA) \| [![](https://img.shields.io/github/stars/GX-XinGao/GRA?style=social&label=Code+Stars)](https://github.com/GX-XinGao/GRA) \| [![Hugging Face](https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-blue)](https://huggingface.co/collections/GX-XinGao/gra-6801cba58ceb0074566cdb4e)
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">ACL 2025 (Findings)</div><img src='images/lemma.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[LEMMA: Learning from Errors for MatheMatical Advancement in LLMs](https://arXiv.org/abs/2503.17439) \\
Zhuoshi Pan, Yu Li, Honglin Lin, Qizhi Pei, **Zinan Tang**, Wei Wu, Chenlin Ming, H. Vicky Zhao, Conghui He, Lijun Wu

[**Project**](https://github.com/pzs19/LEMMA) \| [![](https://img.shields.io/github/stars/pzs19/LEMMA?style=social&label=Code+Stars)](https://github.com/pzs19/LEMMA) \| [![Hugging Face](https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-blue)](https://huggingface.co/collections/panzs19/lemma-68620ced6bedc62fff843e43)
</div>
</div>

# 🎖 Honors and Awards

- *2025*, National Scholarship, Ministry of Education, PRC
- *2024*, Second Prize Scholarship, BUPT
- *2023*, National Scholarship, Ministry of Education, PRC

# 📖 Educations

- *2026.09 - 2028.06* (Expected), master's student in DA, THU, major in EIE.
- *2022.09 - 2026.06*, undergraduate student in SCS, BUPT, major in CS.

<!-- # 💬 Invited Talks
- *2021.06*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.
- *2021.03*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  \| [\[video\]](https://github.com/) -->

# 💻 Internships

- *2025.12 - present*, [Ant Group]((https://www.antgroup.com)), [Ant Ling AI Model Family](https://www.ant-ling.com), Data Optimization, Beijing, China
- *2024.09 - 2025.10*, [Shanghai Artificial Intelligent Laboratory](https://www.shlab.org.cn/), [OpenDataLab](https://opendatalab.org.cn/), RAISE, Beijing, China
- *2024.07 - 2024.08*, [University of Science and Technology of China (USTC)](https://en.ustc.edu.cn/), [State Key Laboratory of Cognitive Intelligence](https://cogskl.iflytek.com/), [COGAI](https://cogai.bdaa.pro/), Hefei, Anhui, China.
- *2023.07 - 2024.06*, [BUPT](https://www.bupt.edu.cn/), [Department of Intelligent Science and Technology](https://ai.bupt.edu.cn/info/1053/2025.htm), Beijing, China.

# 💬 Academic Service

- Reviewer: NeurIPS 2026

# 🔗 Link Exchange

[Qizhi Pei](https://qizhipei.github.io)、[Zhuoshi Pan](https://pzs19.github.io)
