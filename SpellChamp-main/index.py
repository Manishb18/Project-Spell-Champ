f1 = open("./finalWords.txt", "r")
maxlen = ""
lendict = {
}
i = 0
for word in f1.readlines():
    i += 1
    newWord = word.replace("\n", "")
    l = len(newWord)
    if (l in lendict):
        lendict[l] += 1
    else:
        lendict[l] = 1
print(lendict)
# for word in f1.readlines():
#     newWord = word.replace("\n", "")
#     l = len(newWord)
#     if (l >= 20):
#         print(newWord)
f1.flush()
f1.close()
print(i)