.PHONY: default
default: build

.PHONY: build
build: clone compile

.PHONY: clone
clone:
	git clone git@github.com:liberdade-organizacao/no-backend-docs.git docs
	cd docs
	rm -rf .git
	cd ..

.PHONY: compile
compile:
	java -jar br.bsb.liberdade.github-local-blog.jar -d ./docs -i ./templates/index.template.html -ip ./templates/index.article.template.html -p ./templates/article.template.html

.PHONY: clean
clean:
	rm -rf docs
	rm *.html

