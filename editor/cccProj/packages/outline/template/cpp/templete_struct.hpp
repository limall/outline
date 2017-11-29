    struct /*Poutline_nodeName*/ {/*children*/
	    Outline *outline;
		Node *create(){
			return outline->create();
		}/*root*/
    };//end
	private: /*nodeName*/() {}
	public:
		static /*nodeName*/ *pIt() {
			static /*nodeName*/ *_pInstance;
			if(_pInstance==NULL) {
			/*root_declare1*/
			    /*root_declare2*/
/*initInstance*/
/*initRelation*/
			}
			return _pInstance;
		}