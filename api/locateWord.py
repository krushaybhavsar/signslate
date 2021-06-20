def load_labels():
    labels = {}

    with open("./wlasl_class_list.txt") as f:
        for line in f:
            (key, val) = line.split(maxsplit=1)
            labels[int(key)] = val.strip()

    return labels

def find_word(index):
    return load_labels()[index]