from regex_matcher import regex_matcher

if __name__ == "__main__":
    print("Enter input string")
    input_string = str(input())
    print("Enter input pattern")
    pattern = str(input())
    regex_tester = regex_matcher()
    print(regex_tester.isMatch(input_string, pattern))
