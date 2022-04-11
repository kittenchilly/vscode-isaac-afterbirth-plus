# parse-enums.py
# This script outputs a JSON array of auto-complete strings.

# Imports
import json
import re
import sys

# Constants
ENUMS_LUA_PATH = 'enums.lua'
OUTPUT_FILE = 'enums.json'

# Open the "enums.lua" file
with open(ENUMS_LUA_PATH, 'r', encoding='utf8') as f:
    data = f.readlines()

# We can't parse the "enums.lua" file with a parser like slpp,
# because the comments break the parsing engine
# Thus, we revert to just doing regex-based parsing
auto_complete_strings = []
table_name = ''
line_num = 0
in_block_comment = False
for line in data:
    line_num += 1
    line = line.strip()

    # Handle block comments
    if line == '--[[':
        in_block_comment = True
    elif line == '--]]':
        in_block_comment = False
    if in_block_comment:
        continue

    # Skip empty lines and lines that close tables
    if line == '' or line == '}' or line == '};':
        continue

    # Skip lines that are just comments
    if re.match(r'^--', line):
        continue

    # Find out whether we are outside or inside a table
    match = re.match(r'^(\w+) = {', line)
    if match:
        # We are outside of a table
        table_name = match.group(1)
        auto_complete_strings.append(table_name)
    else:
        match = re.match(r'^(\w+) = ', line)
        if match:
            # We are inside of a table
            enum = match.group(1)
            auto_complete_strings.append(table_name + "." + enum)
        else:
            print('Error parsing the "enums.lua" file on line: ' + str(line_num))
            sys.exit(1)

auto_complete_strings.sort()
with open(OUTPUT_FILE, 'w', encoding='utf8') as f:
    json.dump(auto_complete_strings, f, indent=4, sort_keys=True)
