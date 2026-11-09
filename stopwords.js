// PRE-FILLED: stop words
// Very common words that carry little meaning on their own ("the", "and",
// "was"). Without removing them, every text's top words look the same.
// This is a Set: a list where each word appears once and .has(word) checks
// membership quickly. Add words to it if they crowd your results.
//
// The last line has older words that are common in an 1818 novel.

const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and',
  'any', 'are', 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below',
  'between', 'both', 'but', 'by', 'can', 'could', 'did', 'do', 'does', 'doing',
  'down', 'during', 'each', 'even', 'ever', 'every', 'few', 'for', 'from',
  'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers',
  'herself', 'him', 'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it',
  'its', 'itself', 'just', 'me', 'might', 'more', 'most', 'much', 'must', 'my',
  'myself', 'no', 'nor', 'not', 'now', 'of', 'off', 'on', 'once', 'one', 'only',
  'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same',
  'shall', 'she', 'should', 'so', 'some', 'such', 'than', 'that', 'the', 'their',
  'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they', 'this',
  'those', 'through', 'to', 'too', 'under', 'until', 'up', 'upon', 'us', 'very',
  'was', 'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom',
  'why', 'will', 'with', 'would', 'yet', 'you', 'your', 'yours', 'yourself',
  'yourselves', 'also', 'may', 'many', 'said', 'still', 'though', 'well',
  'thou', 'thee', 'thy', 'thine', 'hath', 'whilst', 'thus', 'towards', 'amongst',
])
