shell:
	docker run -it --rm -v ./:/app -w /app node bash

version:
	docker --version