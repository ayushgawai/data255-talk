// Shared talk data, used by presenter.html (read-aloud notes, timers) and guide.html (full script + Q&A).
// say  = exact words to read, in plain language
// left = what we leave out on purpose, so the audience asks about it
// qa   = the questions those gaps invite, with short answers (the slide's speaker answers)
window.TALK = {
 "speakers": {
  "ayush": {
   "name": "Ayush Gawai",
   "color": "#2dd4bf",
   "part": "Waymo, part 1"
  },
  "manav": {
   "name": "Manav Patel",
   "color": "#60a5fa",
   "part": "Waymo, part 2"
  },
  "naman": {
   "name": "Naman Chheda",
   "color": "#fbbf24",
   "part": "MAE, part 1"
  },
  "mansi": {
   "name": "Mansi Verma",
   "color": "#f472b6",
   "part": "MAE, part 2"
  }
 },
 "slides": [
  {
   "title": "Title and agenda",
   "who": "ayush",
   "say": [
    "Hi everyone. I'm Ayush, and with me are Manav, Naman and Mansi.",
    "Two parts today. First, Manav and I show how Waymo uses deep learning to run taxis with no driver. Then Naman and Mansi explain a famous paper called Masked Autoencoders.",
    "The boxes on the person and the bike behind me are object detection, just like our HW3c."
   ],
   "left": [
    "Why we picked these two topics together."
   ],
   "qa": [
    {
     "q": "Why these two topics?",
     "a": "Both are about learning from huge amounts of unlabeled data and then running something fast. Waymo is the industry side, MAE is the research side."
    }
   ]
  },
  {
   "title": "Waymo at scale",
   "who": "ayush",
   "say": [
    "Waymo is a company owned by Alphabet, Google's parent company. It runs paid taxi rides with nobody in the driver's seat.",
    "By March 2026 it was giving about five hundred thousand rides every week. By June 2026 it had driven two hundred seventy-one million miles with only riders inside.",
    "One honest note: these numbers show how big the service is. They don't prove that every research model we mention is the one inside the real cars."
   ],
   "left": [
    "Which cities it runs in.",
    "What \"geofenced\" means.",
    "How it compares to Tesla."
   ],
   "qa": [
    {
     "q": "Which cities does Waymo run in?",
     "a": "Geofenced parts of US cities such as Phoenix, San Francisco, Los Angeles and Austin. In October 2026 it announced Toronto, Madrid and a partnership in Japan."
    },
    {
     "q": "What does geofenced mean?",
     "a": "The car only drives inside an area that has been mapped and approved. Outside that area, it does not offer rides."
    },
    {
     "q": "How is this different from Tesla?",
     "a": "Tesla relies mostly on cameras. Waymo adds lidar and radar as backup in the dark and in glare, and runs with no one in the driver's seat inside its area. We did not study Tesla in depth in our report."
    }
   ]
  },
  {
   "title": "The problem: three constraints",
   "who": "ayush",
   "say": [
    "So what's the problem? The car has to see the world, guess what everyone around it will do, and pick a safe path, many times every second.",
    "Three things make it hard. Speed: it all runs on the car's own computer, so the biggest models are too slow. Rare cases: the dangerous moments, like a child running out, almost never happen, so there's little data. And proof: you need numbers that show it's safe, not a cool demo."
   ],
   "left": [
    "What lidar is.",
    "The exact number of decisions per second.",
    "Why not use the cloud."
   ],
   "qa": [
    {
     "q": "What is lidar?",
     "a": "A spinning laser sensor. It measures distance by timing how long light takes to bounce back, which gives a 3D point cloud. It works in the dark."
    },
    {
     "q": "How fast does it have to decide?",
     "a": "Waymo does not publish its exact latency budget. Publicly we only know it runs many times per second on the car's computer."
    },
    {
     "q": "Why not run the big model in the cloud?",
     "a": "Network delay and dropouts. A car cannot wait for a server before it brakes, so driving decisions must run on board."
    },
    {
     "q": "What is the long tail?",
     "a": "Rare events. Each one is rare, but together they hold most of the risk, and you can never collect enough real examples of them."
    }
   ]
  },
  {
   "title": "Seven years of deep learning",
   "who": "ayush",
   "say": [
    "Waymo did not build one giant model on day one. It took seven years, and each step is a topic from our class.",
    "Architecture search for lidar networks in 2019. Learned data augmentation in 2020. MotionLM in 2023, which treats car movements like words in a sentence.",
    "Then EMMA, scaling laws, the Foundation Model, and in 2026 a World Model that generates realistic driving scenes."
   ],
   "left": [
    "What neural architecture search is.",
    "How movement can be \"words\".",
    "What the scaling laws found.",
    "Whether EMMA is in the real car."
   ],
   "qa": [
    {
     "q": "What is neural architecture search?",
     "a": "A program tries many network designs automatically and scores each on accuracy and speed. Waymo used it to find lidar segmentation networks that fit a latency budget."
    },
    {
     "q": "How can car movement be \"words\"?",
     "a": "MotionLM cuts each path into small movement steps called tokens. A transformer predicts the next token, the way GPT predicts the next word, for all cars at once, so it learns how they react to each other."
    },
    {
     "q": "What did the scaling laws show?",
     "a": "With more data and compute, forecasting and planning get better in a predictable way. But better offline scores do not guarantee better real driving."
    },
    {
     "q": "Is EMMA in the real cars?",
     "a": "Not confirmed. EMMA is a published research model. We keep research and production separate."
    }
   ]
  },
  {
   "title": "Think fast, think slow",
   "who": "ayush",
   "say": [
    "This is the main design, from what Waymo has shared publicly.",
    "The top path is System 1, think fast. It turns camera, lidar and radar into a list of objects, all the time. The bottom path is System 2, think slow: a vision language model trained using Gemini, which knows things about the world and helps in strange scenes. See how the fast dots move quicker.",
    "Both feed a World Decoder that predicts where everyone goes and plans the car's path.",
    "At the bottom is how it fits in the car: a huge teacher model passes its knowledge to a small student. That's knowledge distillation, like DeiT.",
    "Manav, over to you."
   ],
   "left": [
    "What a vision language model is.",
    "How distillation works.",
    "What DeiT is.",
    "Where the sensor counts come from."
   ],
   "qa": [
    {
     "q": "What is a vision language model?",
     "a": "A model that takes images and text together. Here it brings general world knowledge, for example what a police officer's hand signal means."
    },
    {
     "q": "Why not use only the slow model?",
     "a": "It is too slow for every frame. The fast path handles normal driving, and the slow path adds understanding for unusual scenes."
    },
    {
     "q": "How does distillation work?",
     "a": "The small student is trained to copy the big teacher's outputs, its soft predictions, not just the labels. It keeps much of the teacher's skill at a fraction of the size. Waymo has not published its exact loss."
    },
    {
     "q": "What is DeiT?",
     "a": "Data-efficient Image Transformer, 2021. A Vision Transformer trained with an extra distillation token that learns from a CNN teacher."
    },
    {
     "q": "Where do 13 cameras, 4 lidar and 6 radar come from?",
     "a": "Waymo's blog post on its sixth-generation Driver hardware."
    }
   ]
  },
  {
   "title": "The data flywheel",
   "who": "manav",
   "say": [
    "Thanks Ayush. One model plays three roles: Driver, Simulator and Critic.",
    "Inner circle: the Driver practices inside the Simulator, with rewards and penalties, like a video game.",
    "Outer circle: real driving logs come in, the Critic flags odd moments, engineers fix them, test in simulation, and a safety check decides if it ships.",
    "The simulator is built on DeepMind's Genie 3. It creates camera and lidar data for rare cases on demand."
   ],
   "left": [
    "What Genie 3 is.",
    "Whether the inner loop is reinforcement learning.",
    "How they know the simulator is realistic."
   ],
   "qa": [
    {
     "q": "What is Genie 3?",
     "a": "DeepMind's generative world model. It creates interactive scenes from prompts. Waymo post-trained it to output camera and lidar data for its own sensors."
    },
    {
     "q": "Is the inner loop reinforcement learning?",
     "a": "Waymo describes learning in the simulator with rewards and penalties, which is the reinforcement learning idea. The exact algorithm is not public."
    },
    {
     "q": "How do they know the simulator is realistic?",
     "a": "That is an open problem. There is no independent public score for simulator realism, and a model could learn simulator glitches. We list it as a risk in our report."
    },
    {
     "q": "Is the world model a GAN or a diffusion model?",
     "a": "Not disclosed. So we connect it to generative models in general, not to one architecture."
    }
   ]
  },
  {
   "title": "How success is measured",
   "who": "manav",
   "say": [
    "How do you prove a car with no driver is safe? Waymo compares its crash rates to human drivers on the same kinds of roads.",
    "Over two hundred seventy-one million miles, it reports ninety-five percent fewer crashes with serious injuries, ninety-three percent fewer that hurt pedestrians, and eighty-two percent fewer with any injury.",
    "Our caution: this looks back at past data, it is not a controlled experiment. A percentage only means something if you know the miles, the comparison group and the scope."
   ],
   "left": [
    "How the human benchmark is built.",
    "Whether anyone independent checked.",
    "What a confidence interval means here."
   ],
   "qa": [
    {
     "q": "How is the human benchmark built?",
     "a": "From crash rates of human drivers on similar city streets in the same areas, with corrections for how crashes are reported. We did not rebuild it ourselves."
    },
    {
     "q": "Has anyone independent checked these numbers?",
     "a": "The insurer Swiss Re published a study with Waymo using insurance claims, which is in our references. Most of the numbers are still company reported."
    },
    {
     "q": "What does the confidence interval tell you?",
     "a": "The range where the true reduction probably lies. More miles give a narrower range."
    },
    {
     "q": "Why not run a randomized trial?",
     "a": "You cannot randomly assign people to crashes. So the evidence has to be observational, which is why we call it retrospective."
    }
   ]
  },
  {
   "title": "Failures and what changed",
   "who": "manav",
   "say": [
    "Averages can hide failures, so here are three real ones.",
    "School buses in Austin: some cars could pass a school bus before its stop arm was pulled back. That led to a recall of 3,067 vehicles.",
    "A citywide blackout in San Francisco: many cars asked for remote help at once, and Waymo changed its rules after.",
    "And in Santa Monica, a car hit a nine-year-old in a school zone after braking from about seventeen to under six miles per hour. Minor injuries, and the investigation is still open."
   ],
   "left": [
    "How the school bus problem was fixed.",
    "What remote assistance is.",
    "Who was at fault in Santa Monica."
   ],
   "qa": [
    {
     "q": "How was the school bus issue fixed?",
     "a": "Through the recall, which is a software update to the driving system. NHTSA and the NTSB also opened investigations."
    },
    {
     "q": "Why is it a \"recall\" if it's just software?",
     "a": "In the US, a vehicle safety defect needs a formal recall even when the fix is an over-the-air update."
    },
    {
     "q": "What is remote assistance?",
     "a": "People in an operations center who answer the car's questions, like whether it can go around a blockage. Waymo describes them as giving guidance, not driving the car."
    },
    {
     "q": "Was Waymo at fault in Santa Monica?",
     "a": "We don't know. The NTSB has not finished. Waymo says an attentive human might have hit harder, but that is the company's claim, not a finding."
    }
   ]
  },
  {
   "title": "Course map and key learnings",
   "who": "manav",
   "say": [
    "Here's how this connects to our class. Almost every topic shows up: CNN design, data augmentation, detection, transformers, transfer learning, distillation and generative models.",
    "Our biggest takeaway: Waymo's strength isn't one magic network. It's the system around it: small fast models on the car, a simulator for rare cases, and careful statistics.",
    "Now Naman and Mansi will take you through the paper."
   ],
   "left": [
    "Which topic matters most.",
    "What we would change."
   ],
   "qa": [
    {
     "q": "Which class topic matters most here?",
     "a": "Distillation, because it is why anything runs on the car at all. Generative simulation comes next, because it attacks the long tail."
    },
    {
     "q": "What would you do differently if you were Waymo?",
     "a": "Publish a public benchmark for simulator realism, and treat legal rules like school buses as hard constraints with their own tests."
    }
   ]
  },
  {
   "title": "MAE: the paper",
   "who": "naman",
   "say": [
    "Thanks Manav. Our paper is \"Masked Autoencoders Are Scalable Vision Learners\", by Kaiming He and his team at Facebook AI Research, published at CVPR 2022.",
    "CVPR is number one in computer vision on Google Scholar, and number two of all venues, right after Nature. This one paper has over eighteen thousand citations.",
    "The flickering picture on the right is the whole idea. I'll explain it in a minute."
   ],
   "left": [
    "What the h5-index is.",
    "Who Kaiming He is."
   ],
   "qa": [
    {
     "q": "What is the h5-index?",
     "a": "The largest number h such that h papers from the last five years each have at least h citations. For CVPR it is 450."
    },
    {
     "q": "Who is Kaiming He?",
     "a": "The lead author of ResNet and Mask R-CNN, now a professor at MIT."
    }
   ]
  },
  {
   "title": "Problem: can vision learn like BERT?",
   "who": "naman",
   "say": [
    "The problem: labels are expensive. Someone has to tag every image by hand.",
    "In language, BERT fixed this: hide some words and let the model guess them. No labels needed. \"The car stopped at the red light.\" Easy, but only if you understand the sentence.",
    "Images are different. Hide fifteen percent and the model just copies nearby pixels. So MAE hides seventy-five percent, and now it has to understand the scene.",
    "Vision Transformers made hiding pieces easy, which CNNs could not do well."
   ],
   "left": [
    "What self-supervised means.",
    "Why exactly 75%.",
    "What a Vision Transformer is.",
    "Why CNNs didn't work.",
    "What the decoder card means."
   ],
   "qa": [
    {
     "q": "What does self-supervised mean?",
     "a": "The labels come from the data itself. Here, the hidden patches are the answer the model must predict."
    },
    {
     "q": "Why exactly 75%?",
     "a": "They tested many ratios. 75% was best for both fine-tuning and linear probing. Much lower is too easy, much higher leaves too little to work from."
    },
    {
     "q": "What is a Vision Transformer?",
     "a": "Cut the image into 16 by 16 pixel patches, treat each patch like a word token, and use self-attention across all patches."
    },
    {
     "q": "Why didn't CNNs work for this?",
     "a": "A convolution slides over a complete grid. Dropping patches breaks the grid and hidden areas leak into neighbours. A transformer can simply drop tokens."
    },
    {
     "q": "What does the third card, the role of the decoder, mean?",
     "a": "In BERT the decoder predicts words, which already carry meaning. In MAE it predicts raw pixels, which are low level. So the decoder design decides how much meaning ends up in the encoder. MAE keeps the decoder separate and small so the encoder has to learn the meaning."
    }
   ]
  },
  {
   "title": "Method: asymmetric encoder and decoder",
   "who": "naman",
   "say": [
    "Here's how MAE works, left to right. Cut the image into patches and hide seventy-five percent at random.",
    "The big encoder only looks at the visible quarter. That's the key trick, and it makes training about three times faster.",
    "Then placeholders called mask tokens fill the gaps, and a small decoder redraws the image. The loss only checks the hidden patches.",
    "After training, the decoder is thrown away and the encoder is kept.",
    "The code on the right is the real masking trick: random number per patch, sort, keep a quarter."
   ],
   "left": [
    "Why the loss uses only hidden patches.",
    "What a mask token is.",
    "Why the decoder is small.",
    "Why the reconstruction looks blurry."
   ],
   "qa": [
    {
     "q": "Why compute the loss only on the hidden patches?",
     "a": "The visible ones are trivial to copy, so a loss on them wastes effort. The paper's ablation shows masked-only is better."
    },
    {
     "q": "What is a mask token?",
     "a": "One shared learned vector placed at every hidden position, plus a position embedding, so the decoder knows where to draw."
    },
    {
     "q": "Why is the decoder so small?",
     "a": "Redrawing pixels is easy low-level work. A small decoder keeps cost low, about 9% of the encoder's compute per token, and pushes the encoder to hold the meaning."
    },
    {
     "q": "What does argsort do in that code?",
     "a": "Sorting random noise gives each image its own random order. A second argsort gives the order to undo the shuffle later. It all runs batched on the GPU, with no loops."
    },
    {
     "q": "Why is the reconstruction blurry?",
     "a": "Mean squared error averages all plausible answers, which looks blurry. It doesn't matter, because we only keep the encoder."
    }
   ]
  },
  {
   "title": "Results",
   "who": "naman",
   "say": [
    "Does it work? The large model gets eighty-five point nine percent on ImageNet, beating normal supervised training, MoCo and BEiT.",
    "The real story is on the right. Grey, normal training, stops improving as models grow. Yellow, MAE, keeps climbing, to eighty-seven point eight percent, the best at the time using only ImageNet.",
    "Mansi, over to you."
   ],
   "left": [
    "Whether 85.9 vs 85.2 is a big gap.",
    "Why supervised training stops improving.",
    "What top-1 means."
   ],
   "qa": [
    {
     "q": "Is 85.9 versus 85.2 really a big deal?",
     "a": "Less than a point is meaningful at the top of ImageNet. But the bigger wins are simplicity, three times faster training and the scaling trend."
    },
    {
     "q": "Why does supervised training stop improving?",
     "a": "The huge model overfits the 1.28 million labels. A label gives one class per image, while reconstruction gives a lot of signal per image."
    },
    {
     "q": "What is top-1 accuracy?",
     "a": "The share of images where the model's first guess is the correct class."
    },
    {
     "q": "Why 448 pixels?",
     "a": "Fine-tuning at higher resolution gives more patches and more detail, which adds about one point."
    }
   ]
  },
  {
   "title": "What matters, and what it buys",
   "who": "mansi",
   "say": [
    "Thanks Naman. Four design results stand out.",
    "Keeping hidden patches out of the encoder: faster, and fourteen points better on a simple test. Random hiding beats blocks or grids. No data augmentation needed, because masking acts as augmentation. And plain pixels are enough as targets.",
    "What you get: about three times faster training, and better transfer. COCO detection goes from forty-nine point three to fifty-three point three, the same AP metric we used in HW3c."
   ],
   "left": [
    "What the \"simple test\" (linear probing) is.",
    "Why random beats block masking.",
    "What hardware they used."
   ],
   "qa": [
    {
     "q": "What is linear probing?",
     "a": "Freeze the encoder and train only one linear layer on top. It tests how ready-to-use the features are."
    },
    {
     "q": "Why is MAE weaker at linear probing than contrastive methods?",
     "a": "Its features are strong but not linearly separable. Fine-tuning just one transformer block lifts it from 73.5 to 81.0."
    },
    {
     "q": "Why does random masking beat block masking?",
     "a": "Block masking removes large regions, which is too hard. Grid masking is too easy to interpolate. Random is the sweet spot."
    },
    {
     "q": "What hardware did they use?",
     "a": "128 TPU-v3 cores. ViT-Large for 800 epochs took 15.4 hours with MAE, against 42.4 hours with mask tokens in the encoder."
    }
   ]
  },
  {
   "title": "Four critiques",
   "who": "mansi",
   "say": [
    "We judged it four ways.",
    "Peer reviewer: strong accept. Simple idea, very thorough experiments. But similar ideas existed, like BEiT, and almost all tests are on ImageNet.",
    "Patent board: use it inside the company on your own images, but don't patent it. Too much earlier work, and the weights are non-commercial.",
    "Code review: short and clean, with a smart sorting trick, but an old library version, no tests, and archived in 2025.",
    "Authors: the team behind ResNet, Mask R-CNN, MoCo and COCO, so they had the baselines and the benchmarks."
   ],
   "left": [
    "Why strong accept if the idea isn't new.",
    "Why it can't be patented.",
    "What CC BY-NC means.",
    "Whether we ran the code."
   ],
   "qa": [
    {
     "q": "If the idea isn't new, why a strong accept?",
     "a": "The contribution is making it work and scale, with the asymmetric design and 75% masking, backed by clean evidence. The impact since then confirms it."
    },
    {
     "q": "Why can't it be patented?",
     "a": "There is a lot of prior art: denoising autoencoders, BERT, context encoders, BEiT. And the paper itself is public, which counts as prior art too."
    },
    {
     "q": "What does CC BY-NC mean?",
     "a": "Creative Commons, attribution required, non-commercial. A company cannot ship the released weights in a product."
    },
    {
     "q": "Did you run the code?",
     "a": "We read and reviewed it. We did not retrain MAE, because pretraining needs a TPU or GPU cluster for many hours."
    }
   ]
  },
  {
   "title": "Key learnings and our project",
   "who": "mansi",
   "say": [
    "What we learned: a practice task must be hard to be useful. Autoencoders can be powerful pretraining, not just compression. And never judge a model by one metric.",
    "For our project: our video recognition work had few labeled clips, exactly where MAE helps. We plan to fine-tune the last blocks of an MAE encoder and compare it with our CNN from scratch."
   ],
   "left": [
    "Why only the last blocks.",
    "How MAE extends to video."
   ],
   "qa": [
    {
     "q": "Why fine-tune only the last blocks?",
     "a": "The paper shows that tuning even one block recovers most of the accuracy. It's cheap, and it avoids overfitting when labels are few."
    },
    {
     "q": "How does MAE work on video?",
     "a": "Later work called VideoMAE masks around 90% of space-time patches, because video is even more redundant than images."
    }
   ]
  },
  {
   "title": "Closing and questions",
   "who": "mansi",
   "say": [
    "To wrap up: two stories, one lesson. Waymo shows that the system around the model decides whether deep learning is safe on a real road. MAE shows that a hard self-supervised task lets models grow without labels.",
    "Both train big on unlabeled data and then run something smaller. Thank you, we're happy to take your questions."
   ],
   "left": [
    "Whether Waymo uses MAE.",
    "How we used AI tools."
   ],
   "qa": [
    {
     "q": "Could MAE help a company like Waymo?",
     "a": "In principle yes: they have huge amounts of unlabeled driving video, and masked pretraining cuts labeling. We don't know whether Waymo uses MAE specifically."
    },
    {
     "q": "What is the common thread between the two parts?",
     "a": "Self-supervised learning at scale, then distillation or fine-tuning into something practical."
    },
    {
     "q": "Did you use generative AI?",
     "a": "Yes, Claude, to organise sources, draft text and build visuals. We checked every claim against primary sources: Waymo, NHTSA, NTSB and the paper."
    }
   ]
  }
 ]
};
// time budget per slide: about 2.5 spoken words per second, plus a short pause
window.TALK.slides.forEach(s => { s.secs = Math.round(s.say.join(' ').split(/\s+/).length / 2.5) + 2; });
