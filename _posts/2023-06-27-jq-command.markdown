---
layout: post
title:  "TIL: How to use the jq command to filter json data"
date:   2023-06-27 09:00:00:wq -0700
categories: linux
---

Testing `jq` I found the following examples useful.

Print output in one single line:

```
<something> | jq '.data[0].accounts[]' | jq -j '.currency,"$ ", .balance, "\n"'
```

Print json in one single line:

```
<something> | jq '.data[0].accounts[]' | jq -c '{"balance": .balance, "currency": .currency}'
```

Create json objects:

```
<something> | jq '.data[]' | jq '{"id": .id, "first name": .first_name, "policy": .compliance_policy, "type": .type}'
```