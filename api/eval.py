import torch
import torch.nn as nn
from torchvision import transforms
import numpy as np
import torch.nn.functional as F
from i3d import InceptionI3d
import random

transforms = transforms.Compose([transforms.CenterCrop(224)])

def pad(arr):
    return np.append(arr, np.repeat(np.expand_dims(arr[-1], 0), (64 - len(arr)), axis=0), axis=0)

def evaluate(imgs):
    imgs = np.asarray(imgs, dtype=np.float32)
    if len(imgs) < 64:
        imgs = pad(imgs)
    indices = np.sort(np.asarray(random.sample(range(0, len(imgs)), 64), dtype=np.int32))
    imgs = imgs[indices]
    imgs = (imgs / 255.) * 2 - 1
    imgs = torch.from_numpy(imgs.transpose([3, 0, 1, 2]))
    imgs = transforms(imgs)
    i3d = InceptionI3d(2000, in_channels=3)
    i3d.load_state_dict(torch.load('./model2000.pt'))  

    i3d.cuda()
    i3d.eval()


    with torch.no_grad():
        imgs = imgs.cuda()
        imgs = torch.unsqueeze(imgs, 0)
        per_frame_logits = i3d(imgs)

        predictions = torch.max(per_frame_logits, dim=2)[0]

        prediction = torch.argmax(predictions[0]).item()

    return prediction