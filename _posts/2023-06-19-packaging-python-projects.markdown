---
layout: post
title:  "TIL: How to package a python project?"
date:   2023-06-19 11:30:00 -0700
categories: linux
---
I was trying to generate the distribution files for a python package using `setuptools` with a `setup.py` file. But that was creating two issues:

* A deprecation warning, because I was using the legacy 'setup.py install' method.
* To use the package, one had to do `from mypackage import mypackage` instead of just `import mypackage`.

So, I switch to the new methods described here: https://packaging.python.org/en/latest/tutorials/packaging-projects/

For a very simple example of how the project files can be organized, as well as an example of the `pyproject.py`, check the package I was creating:

https://github.com/isacben/pycli - a package to create CLI applications with sub-commands easily

Key ideas:

1. The `pyproject.toml` file is mandatory
2. Use `python3 -m build` to generate the distribution files (don't use `setup.py`)
3. The structure of the project matters

This is an example of the structure of the package source code:

{% highlight %}
package_folder (also the git repository)/
├── LICENSE
├── pyproject.toml
├── README.md
├── src/
│     ├── __init__.py
│     └── module_file.py
|     └── other_required_file.py
└── tests/
{% endhighlight %}

My example does not have the tests folder and files yet, but I will add them.

In terms of the imports, the `module_file.py` file, which is the main script of the package, imports the `other_required_file.py` like this:

{% highlight python %}
import other_required_file
{% endhighlight %}

And to use the package, the developer imports the package like this:

{% highlight python %}
import package_name
{% endhighlight %}

In this example, the `package_name` in the import above is what you define in the `pyproject.py` file. For example:

{% highlight toml %}
[build-system]
requires = ["setuptools>=61.0"]
build-backend = "setuptools.build_meta"

[project]
name = "package_name"
version = "0.1"
authors = [
  { name="Isaac Benitez"},
]
description = "A description"
readme = "README.md"
requires-python = ">=3.8"
classifiers = [
    "Programming Language :: Python :: 3",
    "License :: OSI Approved :: MIT License",
    "Operating System :: OS Independent",
]

[project.urls]
"Homepage" = "https://github.com/isacben/pycli"
{% endhighlight %}