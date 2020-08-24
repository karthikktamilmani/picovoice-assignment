class regex_matcher:
    def match_string(self, input_string, next_match_index, pattern, pattern_index):
        str_len = len(input_string)
        pattern_len = len(pattern)
        pattern_iter = pattern_index
        while pattern_iter < pattern_len:
            current_char = pattern[pattern_iter]
            next_char = pattern[pattern_iter + 1] if pattern_iter < pattern_len - 1 else None
            current_matches = next_match_index < str_len and self.string_match(input_string[next_match_index],current_char)
            if next_char is not None and next_char == "*":
                zero_matches = self.match_string(input_string, next_match_index, pattern, pattern_iter + 2)
                if zero_matches:
                    return True
                return current_matches and self.match_string(input_string, next_match_index + 1, pattern, pattern_iter)
            else:
                if current_matches:
                    next_match_index += 1
                    pattern_iter += 1
                else:
                    return False
        return next_match_index == str_len

    def string_match(self, input_char, pattern_char):
        if pattern_char == ".":
            return True
        else:
            return input_char == pattern_char

    def preprocess_pattern(self, pattern):
        new_pattern = ""
        previous_pattern = ""
        pattern_iter = 0
        while pattern_iter < len(pattern):
            current_char = pattern[pattern_iter]
            next_char = pattern[pattern_iter + 1] if pattern_iter < len(pattern) - 1 else None
            if next_char is not None and next_char == "*":
                if previous_pattern == "." or previous_pattern == current_char:
                    pass
                else:
                    previous_pattern = current_char
                    new_pattern += current_char + "*"
                pattern_iter += 2
            else:
                previous_pattern = ""
                new_pattern += current_char
                pattern_iter += 1
        return new_pattern

    def isMatch(self, s : str, p : str) -> bool:
        preprocessed_pattern = self.preprocess_pattern(p)
        return self.match_string(s, 0, preprocessed_pattern, 0)
